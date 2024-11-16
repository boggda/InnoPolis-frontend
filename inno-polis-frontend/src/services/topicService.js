import Web3 from "web3";
import {conversationFactoryABI} from "../config/abi";
import {factoryAddr} from "../config/const"

export const addTopicService = async (newTopic, newDescription, topics, provider, authType, authAddress, minValue) => {
  if (!newTopic.trim()) {
    return null;
  }
  try {
    const web3 = new Web3(provider);
    const fromAddress = (await web3.eth.getAccounts())[0];
    const contract = new web3.eth.Contract(conversationFactoryABI, factoryAddr);

    // Determine the auth manager address based on the selected type
    let authManager = "0x0000000000000000000000000000000000000000";
    if (authType !== 'none') {
      // You'll need to implement the logic to get the correct auth manager contract
      // based on the authType, authAddress, and minValue
      //authManager = determineAuthManager(authType, authAddress, minValue);
    }
    console.log(authType, authAddress, minValue);

    const title = newTopic.trim();
    const description = newDescription.trim();
    const duration = 60*60*24*3;

    // Encode the function call
    return new Promise((resolve, reject) => {
      contract.methods.createConversation(title, description, authManager, duration)
        .send({from: fromAddress, value: 0})
        .on('transactionHash', (hash) => {
          console.log('Transaction Hash:', hash);
        })
        .on('receipt', async (receipt) => {
          console.log('Transaction Receipt:', receipt);
          // Get the contract address from the receipt events
          const contractAddr = receipt.events.ConversationCreated.returnValues.conversationAddress;
          
          console.log('Contract Address:', contractAddr);
          
          const topic = {
            id: Date.now(),
            title: newTopic,
            description: newDescription,
            contractAddr: contractAddr
          };
          
          resolve(topic);
        })
        .on('error', (error) => {
          console.error('Transaction Error:', error);
          reject(error);
        });
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};