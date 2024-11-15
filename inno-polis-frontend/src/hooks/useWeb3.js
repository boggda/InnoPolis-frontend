import { useState } from 'react';
import { useWeb3Auth } from "@web3auth/modal-react-hooks";


export const useWeb3 = () => {
  const {isConnected, connect, addAndSwitchChain, userInfo, provider, web3Auth, authenticateUser } = useWeb3Auth();
    return {
    isConnected,
    userInfo,
    provider
  };
}; 