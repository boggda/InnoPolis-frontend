import { backendUrl } from "../config/const";
import chainsConfig from "../config/chains.json";

// Create chainNames mapping from the chains.json configuration
const chainNames = Object.entries(chainsConfig).reduce((acc, [name, config]) => ({
  ...acc,
  [config.chainId]: name
}), {});

export const generateReportService = async (contractAddress, provider) => {
  try {
    const chainId = await provider.request({ method: 'eth_chainId' });
    const chainName = chainNames[chainId] || 'baseSepolia'; // default to baseSepolia if chain not found

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