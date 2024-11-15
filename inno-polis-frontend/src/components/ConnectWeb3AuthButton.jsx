import React from 'react';
import { useWeb3Auth } from "@web3auth/modal-react-hooks";

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

  function test(){
    console.log(provider);
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