import React from 'react';
import { useWeb3Auth } from "@web3auth/modal-react-hooks";

const ConnectWeb3AuthButton = () => {
  const { isConnected, connect } = useWeb3Auth();
  
  return isConnected ? (
    <button className="web3-connect-btn connected">
      •&nbsp;connected
    </button>
  ) : (
    <button 
      className="web3-connect-btn disconnected"
      onClick={connect}
    >
      connect
    </button>
  );
};

export default ConnectWeb3AuthButton; 