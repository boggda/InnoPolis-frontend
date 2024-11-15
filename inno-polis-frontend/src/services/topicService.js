import Web3 from "web3";
import {conversationFactoryABI} from "../config/abi";
import {addr} from "../config/const"

export const addTopicService = async (newTopic, newDescription, topics, provider) => {
  if (!newTopic.trim()) {
    return null;
  }


  let topic;
  let result;
  try {
    console.log(provider);
    const web3 = new Web3(provider);
    // Get user's Ethereum public address
    const fromAddress = (await web3.eth.getAccounts())[0];

    const contract = new web3.eth.Contract(conversationFactoryABI, addr);
    // Define the parameters for the createConversation function
    const title = newTopic.trim();
    const description = newDescription.trim();
    const authManager = "0x0000000000000000000000000000000000000000"; // Replace with actual address
    const duration = 60*60*24*3; // Example duration in seconds

    // Encode the function call
    const data = contract.methods.createConversation(title, description, authManager, duration).call();


    contract.methods.createConversation(title, description, authManager, duration)
      .send({from: fromAddress, value: 0})
      .on('transactionHash', (hash) => {
          console.log('Transaction Hash:', hash);
      })
      .on('receipt', (receipt) => {
          console.log('Transaction Receipt:', receipt);
      })
      .on('error', (error) => {
          console.error('Transaction Error:', error);
      });

      const contractAddr = await contract.methods.createConversation(title, description, authManager, duration)
        .call({from: fromAddress});

      topic = {
        id: Date.now(),
        title: newTopic,
        description: newDescription,
        contractAddr: contractAddr
      };
      return topic;
  } catch (error) {
    console.log(error);
  }
}; 