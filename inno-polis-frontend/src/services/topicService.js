import Web3 from "web3";
import {conversationFactoryABI} from "../config/abi";
import {addr} from "../config/const"

export const addTopicService = async (newTopic, topics, provider) => {
  if (!newTopic.trim()) {
    return null;
  }

  try {
    console.log(provider);
    const web3 = new Web3(provider);
    // Get user's Ethereum public address
    const fromAddress = (await web3.eth.getAccounts())[0];

    const contract = new web3.eth.Contract(conversationFactoryABI, addr);
    // Define the parameters for the createConversation function
    const title = newTopic.trim();
    const description = "Test Description";
    const authManager = "0x0000000000000000000000000000000000000000"; // Replace with actual address
    const duration = 60*60*24*3; // Example duration in seconds

    // Encode the function call
    const data = contract.methods.createConversation(title, description, authManager, duration).encodeABI();

    const amount = 0;
    let transaction = {
      from: fromAddress,
      to: addr,
      data: data,
      value: amount
    }

    // calculate gas transaction before sending
    transaction = { ...transaction, gas: await web3.eth.estimateGas(transaction) };

    // Submit transaction to the blockchain and wait for it to be mined
    const receipt = await web3.eth.sendTransaction(transaction);

    return JSON.stringify(receipt, (key, value) =>
      typeof value === 'bigint'
        ? value.toString()
        : value // return everything else unchanged
    );
  } catch (error) {
    console.log(error);
  }

  return 0;
}; 