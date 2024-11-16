import { Web3AuthProvider } from "@web3auth/modal-react-hooks";
import { WalletServicesProvider } from "@web3auth/wallet-services-plugin-react-hooks";
import { Web3AuthInnerContext } from "@web3auth/modal-react-hooks";
import web3AuthContextConfig from "./wallet.tsx";

import ConnectWeb3AuthButton from './components/ConnectWeb3AuthButton';
import TopicsTab from './components/TopicsTab';
import StatementsTab from './components/StatementsTab';
import VoteTab from './components/VoteTab';
import ReportTab from './components/ReportTab';
import NetworkSwitcher from './components/NetworkSwitcher';
import { usePolisActions } from './hooks/usePolisActions';
import './styles.css';
import ConnectCapsuleButton from "./components/ConnectCapsule.jsx";

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
    setStatements,
    addTopic,
    addStatement,
    vote,
    generateReport,
    newDescription,
    setNewDescription,
    addVote
  } = usePolisActions();

  return (
    <div className="polis-clone">
      
      <Web3AuthProvider config={web3AuthContextConfig}>
        <WalletServicesProvider context={Web3AuthInnerContext}>
        <div className="header">
          <h1>InnoPolis</h1>
          <div className="auth-controls">
            <NetworkSwitcher />
            <ConnectWeb3AuthButton />
          </div>
        </div>
          
          
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
                  setStatements={setStatements}
                  topics={topics}
                />
                <VoteTab 
                  currentStatementIndex={currentStatementIndex}
                  statements={statements}
                  vote={vote}
                  addVote={addVote}
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