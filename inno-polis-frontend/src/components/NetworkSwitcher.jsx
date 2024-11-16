import React from 'react';
import { useWeb3Auth } from "@web3auth/modal-react-hooks";
import { chain } from '../config/chains.tsx';

const NetworkSwitcher = () => {
  const { provider } = useWeb3Auth();

  const switchNetwork = async (selectedChain) => {
    if (!provider) return;

    try {
      // Try to switch to the network
      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: selectedChain.chainId }],
      });
    } catch (error) {
      // If the chain hasn't been added to the user's wallet (error 4902)
      if (error.code === 4902) {
        try {
          await provider.request({
            method: "wallet_addEthereumChain",
            params: [{
              chainId: selectedChain.chainId,
              chainName: selectedChain.displayName,
              nativeCurrency: {
                name: selectedChain.tickerName,
                symbol: selectedChain.ticker,
                decimals: 18
              },
              rpcUrls: [selectedChain.rpcTarget],
              blockExplorerUrls: [selectedChain.blockExplorerUrl]
            }]
          });
        } catch (addError) {
          console.error("Error adding chain:", addError);
        }
      }
      console.error("Error switching chain:", error);
    }
  };

  // Get current network
  const getCurrentNetwork = async () => {
    if (!provider) return null;
    try {
      const chainId = await provider.request({ method: 'eth_chainId' });
      return Object.values(chain).find(network => network.chainId.toLowerCase() === chainId.toLowerCase());
    } catch (error) {
      console.error("Error getting current network:", error);
      return null;
    }
  };

  return (
    <select 
      className="network-switch-select"
      onChange={(e) => switchNetwork(chain[e.target.value])}
    >
      <option value="">Select Network</option>
      {Object.entries(chain).map(([key, network]) => (
        <option key={key} value={key}>
          {network.displayName}
        </option>
      ))}
    </select>
  );
};

export default NetworkSwitcher; 