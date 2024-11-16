import Web3 from "web3";
import {conversationFactoryABI} from "../config/abi";
import {factoryAddr} from "../config/const"

export const addTopicService = async (newTopic, newDescription, topics, provider) => {
  if (!newTopic.trim()) {
    return null;
  }
  try {
    const web3 = new Web3(provider);
    // Get user's Ethereum public address
    //console.log(await web3.eth.getAccounts());
    const fromAddress = (await web3.eth.getAccounts())[0];

    const contract = new web3.eth.Contract(conversationFactoryABI, factoryAddr);
    // Define the parameters for the createConversation function
    const title = newTopic.trim();
    const description = newDescription.trim();
    const authManager = "0x0000000000000000000000000000000000000000"; // Replace with actual address
    const duration = 60*60*24*3; // Example duration in seconds

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