import React, { useState } from 'react';
import { useWeb3Auth } from "@web3auth/modal-react-hooks";

const ReportTab = ({ generateReport }) => {
  const [contractAddress, setContractAddress] = useState('');
  const [showReport, setShowReport] = useState(false);
  const [reportStatus, setReportStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const {isConnected, connect, addAndSwitchChain, userInfo, provider, web3Auth, authenticateUser } = useWeb3Auth();

  // Create chainNames mapping from the chains.json configuration
  const chainNames = Object.entries(chainsConfig).reduce((acc, [name, config]) => ({
    ...acc,
    [config.chainId]: name
  }), {});

  const handleGenerateReport = async () => {
    if (contractAddress) {
      setIsLoading(true);
      const result = await generateReport(contractAddress, provider);
      setIsLoading(false);
      
      if (result.success) {
        const chainId = await provider.request({ method: 'eth_chainId' });
        const chainName = chainNames[chainId] || 'baseSepolia';
        setReportStatus({
          type: 'success',
          url: `${window.location.protocol}//${window.location.hostname}/index_report.html?report_id=${contractAddress}&chain=${chainName}`,
          message: `Report generated successfully!`
        });
      } else {
        setReportStatus({
          type: 'error',
          message: `Failed to generate report: ${result.error}`
        });
      }
      setShowReport(true);
    }
  };

  return (
    <div className="report">
      <h2>Report</h2>
      
      <div className="input-group">
        <input
          type="text"
          value={contractAddress}
          onChange={(e) => setContractAddress(e.target.value)}
          placeholder="Enter contract address"
          className="contract-address-input"
        />
        <button 
          onClick={handleGenerateReport}
          disabled={!contractAddress || isLoading}
          className="generate-button"
        >
          {isLoading ? 'Generating...' : 'Generate Report'}
        </button>
      </div>

      {showReport && reportStatus && (
        <div className={`report-card ${reportStatus.type}`}>
          <h3>Report Status for <code className="contract-code">{contractAddress}</code></h3>
          <a 
            href={reportStatus.url || '#'} 
            className="text-blue-600 hover:text-blue-800 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {reportStatus.message}
          </a>
        </div>
      )}
    </div>
  );
};

export default ReportTab; 