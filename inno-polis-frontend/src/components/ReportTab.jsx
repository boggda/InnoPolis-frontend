import React, { useState } from 'react';
import { useWeb3Auth } from "@web3auth/modal-react-hooks";

const ReportTab = ({ generateReport }) => {
  const [contractAddress, setContractAddress] = useState('');
  const [showReport, setShowReport] = useState(false);
  const [reportStatus, setReportStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const {isConnected, connect, addAndSwitchChain, userInfo, provider, web3Auth, authenticateUser } = useWeb3Auth();

  const handleGenerateReport = async () => {
    if (contractAddress) {
      setIsLoading(true);
      const result = await generateReport(contractAddress, provider);
      setIsLoading(false);
      
      if (result.success) {
        setReportStatus({
          type: 'success',
          message: `Report generated successfully! Conversation ID: ${result.conversationId}`
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
          <h3>Report Status</h3>
          <p>{reportStatus.message}</p>
        </div>
      )}
    </div>
  );
};

export default ReportTab; 