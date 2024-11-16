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

    let calls = [];
    // Determine the auth manager address based on the selected type
    let authManager = "0x0000000000000000000000000000000000000000";
    if (authType !== 'none') {
      if (authType === 'ens') {
        calls.push(contract.methods.createENSHoldingManager(authAddress).encodeABI());
        authManager = await contract.methods.createENSHoldingManager(authAddress).call();
      } else if (authType === 'chiliz') {
        calls.push(contract.methods.createTokenHoldingManager(authAddress, minValue).encodeABI());
        authManager = await contract.methods.createTokenHoldingManager(authAddress, minValue).call();
      } else if (authType === 'erc20') {
        calls.push(contract.methods.createTokenHoldingManager(authAddress, minValue).encodeABI());
        authManager = await contract.methods.createTokenHoldingManager(authAddress, minValue).call();
      } else if (authType === 'eth') {
        calls.push(contract.methods.createETHBalanceManager(minValue).encodeABI());
        authManager = await contract.methods.createETHBalanceManager(minValue).call();
      }
    }
    console.log(authType, authAddress, minValue);
    console.log(authManager);

    const title = newTopic.trim();
    const description = newDescription.trim();
    const duration = 60*60*24*3;

    calls.push(contract.methods.createConversation(title, description, authManager, duration).encodeABI());

    // Encode the function call
    return new Promise((resolve, reject) => {
      contract.methods.multicall(calls)
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