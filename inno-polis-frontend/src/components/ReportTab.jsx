import React, { useState } from 'react';

const ReportTab = ({ contractAddress, setContractAddress, generateReport }) => {
  const [showReport, setShowReport] = useState(false);

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
          onClick={generateReport}
          disabled={!contractAddress}
          className="generate-button"
        >
          Generate Report
        </button>
      </div>

      {showReport && contractAddress && (
        <div className="report-card">
          <h3>Report for Contract: {contractAddress}</h3>
        </div>
      )}
    </div>
  );
};

export default ReportTab; 