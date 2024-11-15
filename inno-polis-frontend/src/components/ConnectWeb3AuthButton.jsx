import React from 'react';
import { useWeb3Auth } from "@web3auth/modal-react-hooks";
import Web3 from "web3";

const ConnectWeb3AuthButton = () => {
  const { isConnected, connect, addAndSwitchChain, userInfo, provider, web3Auth, authenticateUser } = useWeb3Auth();
  
  if (isConnected) {
    return (
      <div
        className="flex flex-row rounded-full px-6 py-3 text-white justify-center align-center cursor-pointer"
        style={{ backgroundColor: "green" }}
        onClick={test}
      >
        Test
      </div>
    );
  }

  async function test(){
    let abi = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"conversationAddress","type":"address"},{"indexed":true,"internalType":"address","name":"creator","type":"address"}],"name":"ConversationCreated","type":"event"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"conversations","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_title","type":"string"},{"internalType":"string","name":"_description","type":"string"},{"internalType":"address","name":"_authManager","type":"address"},{"internalType":"uint256","name":"_duration","type":"uint256"}],"name":"createConversation","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getConversationCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_creator","type":"address"}],"name":"getConversationsByCreator","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"}];
    let addr = "0xC317f333E47182b7B4116E0487AE53c88bF9BfA9";
    try {
      const web3 = new Web3(provider);
      // Get user's Ethereum public address
      const fromAddress = (await web3.eth.getAccounts())[0];

      const contract = new web3.eth.Contract(abi, addr);
      // Define the parameters for the createConversation function
      const title = "Sample Title";
      const description = "Sample Description";
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
  }

  /*
  function connect_wrapper(){
    let provider = connect();
    console.log(provider);
  }
  */
  
  return (
      <div
        className="flex flex-row rounded-full px-6 py-3 text-white justify-center align-center cursor-pointer"
        style={{ backgroundColor: "#0364ff" }}
        onClick={connect}
      >
        Connect to Web3Auth
      </div>
  );
};

export default ConnectWeb3AuthButton; 