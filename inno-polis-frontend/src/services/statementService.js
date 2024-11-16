import "../config/abi"
import Web3 from "web3";
import {conversationABI} from "../config/abi";

export const addStatementService = async (newStatement, selectedTopic, provider) => {
  if (!newStatement.trim() || !selectedTopic.trim()) {
    return null;
  }

  // TODO: need to add unique key
  const statement = {
    topicAddr: selectedTopic.trim(),
    content: newStatement.trim()
  };

  try {
    const web3 = new Web3(provider);
    // Get user's Ethereum public address
    const fromAddress = (await web3.eth.getAccounts())[0];
    const contract = new web3.eth.Contract(conversationABI, statement.topicAddr);

    // Encode the function call
    return new Promise((resolve, reject) => {
      contract.methods.addStatement(statement.content)
        .send({from: fromAddress, value: 0})
        .on('transactionHash', (hash) => {
          console.log('Transaction Hash:', hash);
        })
        .on('receipt', async (receipt) => {
          console.log('Transaction Receipt:', receipt);
          // Get the contract address from the receipt or make a call          
          resolve(statement);
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