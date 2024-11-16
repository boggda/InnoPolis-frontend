import React, { useState, useEffect } from 'react';
import { useWeb3Auth } from "@web3auth/modal-react-hooks";
import { chain } from '../config/chains.tsx';

const NetworkSwitcher = () => {
  const { provider } = useWeb3Auth();
  const [currentNetwork, setCurrentNetwork] = useState(null);

  const getCurrentNetwork = async () => {
    if (!provider) return null;
    try {
      const chainId = await provider.request({ method: 'eth_chainId' });
      const network = Object.values(chain).find(network => 
        network.chainId.toLowerCase() === chainId.toLowerCase()
      );
      return network || null;
    } catch (error) {
      console.error("Error getting current network:", error);
      return null;
    }
  };

  const updateNetwork = async () => {
    const network = await getCurrentNetwork();
    setCurrentNetwork(network);
  };

  useEffect(() => {
    if (provider) {
      updateNetwork();

      // Add event listeners
      provider.on("chainChanged", updateNetwork);
      provider.on("connect", updateNetwork);
      provider.on("accountsChanged", updateNetwork);
    }

    return () => {
      if (provider) {
        // Remove event listeners on cleanup
        provider.removeListener("chainChanged", updateNetwork);
        provider.removeListener("connect", updateNetwork);
        provider.removeListener("accountsChanged", updateNetwork);
      }
    };
  }, [provider]);

  const switchNetwork = async (selectedChain) => {
    if (!provider || !selectedChain) return;
    
    try {
      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: selectedChain.chainId }],
      });
      await updateNetwork(); // Force update after switch
    } catch (error) {
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
          await updateNetwork(); // Force update after adding chain
        } catch (addError) {
          console.error("Error adding chain:", addError);
        }
      }
      console.error("Error switching chain:", error);
    }
  };

  const handleNetworkChange = (e) => {
    const selectedChain = chain[e.target.value];
    if (selectedChain) {
      switchNetwork(selectedChain);
    }
  };

  const currentNetworkKey = currentNetwork 
    ? Object.keys(chain).find(key => chain[key].chainId === currentNetwork.chainId) 
    : "";

  return (
    <select 
      className="network-switch-select"
      onChange={handleNetworkChange}
      value={currentNetworkKey}
    >
      <option value="" disabled>Select Network</option>
      {Object.entries(chain).map(([key, network]) => (
        <option key={key} value={key}>
          {network.displayName}
        </option>
      ))}
    </select>
  );
};

export default NetworkSwitcher; 