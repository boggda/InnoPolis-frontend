import React, { useState } from 'react';
import { CHAIN_NAMESPACES, IAdapter, IProvider, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3Auth, Web3AuthOptions } from "@web3auth/modal";
import web3AuthContextConfig from "./wallet.tsx";
import { Web3AuthInnerContext, Web3AuthProvider } from "@web3auth/modal-react-hooks";
import { WalletServicesProvider } from "@web3auth/wallet-services-plugin-react-hooks";
import { useWeb3Auth } from "@web3auth/modal-react-hooks";
//import "./ConnectWeb3AuthButton.jsx";

const ConnectWeb3AuthButton = () => {
  const { isConnected, connect } = useWeb3Auth();

  if (isConnected) {
    return null;
  }
  return (
    <div
      className="flex flex-row rounded-full px-6 py-3 text-white justify-center align-center cursor-pointer"
      style={{ backgroundColor: "#0364ff" }}
      onClick={connect}
    >
      Connect to Web3Auth
    </div>
  );
};

function PolisClone() {
  const [topics, setTopics] = useState([]);
  const [statements, setStatements] = useState([]);
  const [newTopic, setNewTopic] = useState('');
  const [newStatement, setNewStatement] = useState('');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [currentStatementIndex, setCurrentStatementIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('topics');

/*
  const chainConfig = {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x1",
    rpcTarget: "https://rpc.ankr.com/eth",
    // Avoid using public rpcTarget in production.
    // Use services like Infura, Quicknode etc
    displayName: "Ethereum Mainnet",
    blockExplorerUrl: "https://etherscan.io",
    ticker: "ETH",
    tickerName: "Ethereum",
    logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
  };
  const privateKeyProvider = new EthereumPrivateKeyProvider({
    config: { chainConfig },
  });
  const clientId = 'BGs7ZtLUyzUYJNXA9ZLOpMiIqRT-lsV2kESHIQ3iORck36ugyhUljKi3ts7Qo4XMptv9dAK-EBF2qmm4Z5Lyz-s';
  
  const web3AuthOptions = {
    chainConfig: chainConfig,
    clientId,
    web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
    privateKeyProvider,
  }
  const web3auth = new Web3Auth(web3AuthOptions);
  const [provider, setProvider] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
*/
  const addTopic = async () => {
    if (newTopic.trim()) {
      //await web3auth.initModal();
      //setProvider(web3auth.provider);
      //const web3authProvider = await web3auth.connect();
      //const user = await web3auth.getUserInfo();
      //console.log(user);
      setTopics([...topics, { id: Date.now(), title: newTopic }]);
      setNewTopic('');
    }
  };

  const addStatement = () => {
    if (newStatement.trim() && selectedTopic !== null) {
      setStatements([...statements, {
        id: Date.now(),
        topicId: selectedTopic,
        content: newStatement,
        votes: { agree: 0, disagree: 0, skip: 0 }
      }]);
      setNewStatement('');
    }
  };

  const vote = (voteType) => {
    if (currentStatementIndex < statements.length) {
      setStatements(statements.map((statement, index) =>
        index === currentStatementIndex
          ? { ...statement, votes: { ...statement.votes, [voteType]: statement.votes[voteType] + 1 } }
          : statement
      ));
      setCurrentStatementIndex(prevIndex => prevIndex + 1);
    }
  };

  const generateReport = (topicId) => {
    const topicStatements = statements.filter(s => s.topicId === topicId);
    const totalVotes = topicStatements.reduce((acc, s) => acc + s.votes.agree + s.votes.disagree + s.votes.skip, 0);
    const mostAgreed = topicStatements.sort((a, b) => b.votes.agree - a.votes.agree)[0];

    return (
      <div className="report">
        <p><strong>Total votes:</strong> {totalVotes}</p>
        <p><strong>Number of statements:</strong> {topicStatements.length}</p>
        {mostAgreed && (
          <div className="most-agreed">
            <h4>Most agreed statement:</h4>
            <p>"{mostAgreed.content}"</p>
            <p>Votes: {mostAgreed.votes.agree} agree, {mostAgreed.votes.disagree} disagree, {mostAgreed.votes.skip} skip</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="polis-clone">
      <h1>Pol.is Clone</h1>
      <Web3AuthProvider config={web3AuthContextConfig}>
        <WalletServicesProvider context={Web3AuthInnerContext}>
        <ConnectWeb3AuthButton></ConnectWeb3AuthButton>
        
      <p className="subtitle">Create topics, make statements, vote, and generate reports</p>

      <div className="tabs">
        <button className={activeTab === 'topics' ? 'active' : ''} onClick={() => setActiveTab('topics')}>Topics</button>
        <button className={activeTab === 'statements' ? 'active' : ''} onClick={() => setActiveTab('statements')}>Statements</button>
        <button className={activeTab === 'vote' ? 'active' : ''} onClick={() => setActiveTab('vote')}>Vote</button>
        <button className={activeTab === 'report' ? 'active' : ''} onClick={() => setActiveTab('report')}>Report</button>
      </div>

      <div className="content">
        {activeTab === 'topics' && (
          <div className="topics">
            <h2>Topics</h2>
            <div className="input-group">
              <input
                type="text"
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                placeholder="Enter a new topic"
              />
              <button onClick={addTopic}>Add Topic</button>
            </div>
            <div className="topic-list">
              {topics.map(topic => (
                <div key={topic.id} className="topic-card">
                  <h3>{topic.title}</h3>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'statements' && (
          <div className="statements">
            <h2>Statements</h2>
            <div className="input-group">
              <select
                value={selectedTopic || ''}
                onChange={(e) => setSelectedTopic(Number(e.target.value))}
              >
                <option value="">Select a topic</option>
                {topics.map(topic => (
                  <option key={topic.id} value={topic.id}>{topic.title}</option>
                ))}
              </select>
              <input
                type="text"
                value={newStatement}
                onChange={(e) => setNewStatement(e.target.value)}
                placeholder="Enter a new statement"
              />
              <button onClick={addStatement}>Add Statement</button>
            </div>
            <div className="statement-list">
              {statements.map(statement => (
                <div key={statement.id} className="statement-card">
                  <p>{statement.content}</p>
                  <p className="topic-label">Topic: {topics.find(t => t.id === statement.topicId)?.title}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'vote' && (
          <div className="vote">
            <h2>Vote</h2>
            {currentStatementIndex < statements.length ? (
              <div className="vote-card">
                <h3>Statement to Vote On</h3>
                <p>{statements[currentStatementIndex].content}</p>
                <div className="vote-buttons">
                  <button className="agree" onClick={() => vote('agree')}>Agree</button>
                  <button className="disagree" onClick={() => vote('disagree')}>Disagree</button>
                  <button className="skip" onClick={() => vote('skip')}>Skip</button>
                </div>
              </div>
            ) : (
              <p className="no-statements">No more statements to vote on.</p>
            )}
          </div>
        )}

        {activeTab === 'report' && (
          <div className="report">
            <h2>Report</h2>
            <select
              onChange={(e) => setSelectedTopic(Number(e.target.value))}
            >
              <option value="">Select a topic</option>
              {topics.map(topic => (
                <option key={topic.id} value={topic.id}>{topic.title}</option>
              ))}
            </select>
            {selectedTopic && (
              <div className="report-card">
                <h3>Report for {topics.find(t => t.id === selectedTopic)?.title}</h3>
                {generateReport(selectedTopic)}
              </div>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        .polis-clone {
          max-width: 800px;
          margin: 0 auto;
          font-family: 'Arial', sans-serif;
          color: #333;
          background-color: #f5f5f5;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h1 {
          color: #2c3e50;
          text-align: center;
          margin-bottom: 10px;
        }

        .subtitle {
          text-align: center;
          color: #7f8c8d;
          margin-bottom: 20px;
        }

        .tabs {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .tabs button {
          flex: 1;
          padding: 10px;
          border: none;
          background-color: #ecf0f1;
          color: #2c3e50;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .tabs button:hover {
          background-color: #bdc3c7;
        }

        .tabs button.active {
          background-color: #3498db;
          color: white;
        }

        .content {
          background-color: white;
          padding: 20px;
          border-radius: 5px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        h2 {
          color: #2c3e50;
          margin-bottom: 15px;
        }

        .input-group {
          display: flex;
          margin-bottom: 15px;
        }

        .input-group input,
        .input-group select {
          flex: 1;
          padding: 10px;
          font-size: 16px;
          border: 1px solid #bdc3c7;
          border-radius: 3px;
        }

        .input-group button {
          padding: 10px 20px;
          background-color: #2ecc71;
          color: white;
          border: none;
          border-radius: 3px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .input-group button:hover {
          background-color: #27ae60;
        }

        .topic-card,
        .statement-card,
        .vote-card,
        .report-card {
          background-color: #ecf0f1;
          padding: 15px;
          margin-bottom: 10px;
          border-radius: 5px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .topic-card h3,
        .statement-card p {
          margin: 0;
          color: #34495e;
        }

        .topic-label {
          font-size: 14px;
          color: #7f8c8d;
          margin-top: 5px;
        }

        .vote-buttons {
          display: flex;
          justify-content: space-between;
          margin-top: 15px;
        }

        .vote-buttons button {
          flex: 1;
          margin: 0 5px;
          padding: 10px;
          border: none;
          border-radius: 3px;
          color: white;
          cursor: pointer;
          transition: opacity 0.3s ease;
        }

        .vote-buttons button:hover {
          opacity: 0.8;
        }

        .vote-buttons .agree {
          background-color: #2ecc71;
        }

        .vote-buttons .disagree {
          background-color: #e74c3c;
        }

        .vote-buttons .skip {
          background-color: #95a5a6;
        }

        .no-statements {
          text-align: center;
          color: #7f8c8d;
        }

        .report p {
          margin: 5px 0;
        }

        .most-agreed {
          margin-top: 15px;
          padding: 10px;
          background-color: #e8f6f3;
          border-radius: 5px;
        }

        .most-agreed h4 {
          color: #16a085;
          margin-bottom: 5px;
        }
      `}</style>
    </WalletServicesProvider>
    </Web3AuthProvider>
    </div>
  );
}

export default PolisClone;