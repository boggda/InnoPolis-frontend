import { backendUrl } from "../config/const";

export const generateReportService = async (contractAddress, provider) => {
  try {
    const chainId = await provider.request({ method: 'eth_chainId' });
    
    // Map chain IDs to network names
    const chainNames = {
      '0x1': 'mainnet',           // Ethereum Mainnet
      '0xaa36a7': 'sepolia',      // Sepolia
      '0x4268': 'holesky',        // Holesky
      '0x89': 'polygon',          // Polygon Mainnet
      '0x13882': 'polygon_amoy',  // Polygon Amoy Testnet
      '0x14A34': 'base_sepolia',  // Base Sepolia
      '0x38': 'bnb',             // Binance Smart Chain
      '0xA86A': 'avalanche',     // Avalanche
      '0xA4B1': 'arbitrum',      // Arbitrum
      '0xA': 'optimism',         // Optimism
      '0x19': 'cronos',          // Cronos
      '0x63564c40': 'harmony',   // Harmony
      '0xa4ec': 'celo',          // Celo
      '0x504': 'moonbeam',       // Moonbeam
      '0x505': 'moonriver',      // Moonriver
      '0x2019': 'klaytn',        // Klaytn
      '0xE': 'flare',           // Flare
      '0x13': 'songbird',       // Songbird
      '0x133E40': 'zkatana'     // zKatana Testnet
    };
    
    const chainName = chainNames[chainId] || 'base_sepolia'; // default to holesky if chain not found

    const response = await fetch(
      `${backendUrl}/api/v3/create_report?report_id=${contractAddress}&chain=${chainName}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    
    if (data.status === "completed") {
      console.log("Report generation completed");
      return {
        success: true,
        conversationId: data.conversation_id
      };
    } else {
      throw new Error('Report generation failed');
    }

  } catch (error) {
    console.error('Report Generation Error:', error);
    return {
      success: false,
      error: error.message
    };
  }
}; 