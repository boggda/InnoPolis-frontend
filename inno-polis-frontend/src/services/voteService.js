import Web3 from "web3";
import {conversationABI} from "../config/abi";

export const processVoteService = async (voteArray, conversationAddress, provider) => {
  try {
    const web3 = new Web3(provider);
    const fromAddress = (await web3.eth.getAccounts())[0];

    // Create contract instance
    const contract = new web3.eth.Contract(conversationABI, conversationAddress);
    
    // Convert voteArray to multicall format
    const calls = Object.entries(voteArray).map(([statementId, vote]) => {
      // Encode the function call for each vote
      const encodedCall = contract.methods.vote(
        parseInt(statementId),
        vote
      ).encodeABI();
      
      return encodedCall;
    });

    // Encode the multicall function
    return new Promise((resolve, reject) => {
      contract.methods.multicall(calls)
        .send({ from: fromAddress })
        .on('transactionHash', (hash) => {
          console.log('Vote Transaction Hash:', hash);
        })
        .on('receipt', (receipt) => {
          console.log('Vote Transaction Receipt:', receipt);
          resolve(receipt);
        })
        .on('error', (error) => {
          console.error('Vote Transaction Error:', error);
          reject(error);
        });
    });
  } catch (error) {
    console.error('Process Vote Error:', error);
    throw error;
  }
}; 