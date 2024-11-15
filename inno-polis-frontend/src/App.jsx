import React from 'react';
import { Web3AuthProvider } from "@web3auth/modal-react-hooks";
import { WalletServicesProvider } from "@web3auth/wallet-services-plugin-react-hooks";
import { Web3AuthInnerContext } from "@web3auth/modal-react-hooks";
import web3AuthContextConfig from "./wallet.tsx";

import ConnectWeb3AuthButton from './components/ConnectWeb3AuthButton';
import TopicsTab from './components/TopicsTab';
import StatementsTab from './components/StatementsTab';
import VoteTab from './components/VoteTab';
import ReportTab from './components/ReportTab';
import { usePolisActions } from './hooks/usePolisActions';
import './styles.css';

function PolisClone() {
  const {
    topics,
    statements,
    newTopic,
    newStatement,
    selectedTopic,
    currentStatementIndex,
    activeTab,
    setNewTopic,
    setNewStatement,
    setSelectedTopic,
    setActiveTab,
    addTopic,
    addStatement,
    vote,
    generateReport,
    newDescription,
    setNewDescription
  } = usePolisActions();

  

  return (
    <div className="polis-clone">
      <h1>InnoPolis</h1>
      <Web3AuthProvider config={web3AuthContextConfig}>
        <WalletServicesProvider context={Web3AuthInnerContext}>
          <ConnectWeb3AuthButton />
          
          <p className="subtitle">Create topics, make statements, vote, and generate reports</p>

          <div className="tabs">
            <button className={activeTab === 'topics' ? 'active' : ''} onClick={() => setActiveTab('topics')}>Topics</button>
            <button className={activeTab === 'statements' ? 'active' : ''} onClick={() => setActiveTab('statements')}>Statements & Votes</button>
            <button className={activeTab === 'report' ? 'active' : ''} onClick={() => setActiveTab('report')}>Report</button>
          </div>

          <div className="content">
            {activeTab === 'topics' && (
              <TopicsTab 
                newTopic={newTopic}
                setNewTopic={setNewTopic}
                newDescription={newDescription}
                setNewDescription={setNewDescription}
                addTopic={addTopic}
                topics={topics}
              />
            )}

            {activeTab === 'statements' && (
              <div>
                <StatementsTab 
                  selectedTopic={selectedTopic}
                  setSelectedTopic={setSelectedTopic}
                  newStatement={newStatement}
                  setNewStatement={setNewStatement}
                  addStatement={addStatement}
                  statements={statements}
                  topics={topics}
                />
                <VoteTab 
                  currentStatementIndex={currentStatementIndex}
                  statements={statements}
                  vote={vote}
                />
              </div>
            )}

            {activeTab === 'report' && (
              <ReportTab 
                selectedTopic={selectedTopic}
                setSelectedTopic={setSelectedTopic}
                topics={topics}
                generateReport={generateReport}
              />
            )}
          </div>
        </WalletServicesProvider>
      </Web3AuthProvider>
    </div>
  );
}

export default PolisClone;