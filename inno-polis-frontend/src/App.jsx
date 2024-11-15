import React, { useState } from 'react';
import { Web3AuthProvider } from "@web3auth/modal-react-hooks";
import { WalletServicesProvider } from "@web3auth/wallet-services-plugin-react-hooks";
import { Web3AuthInnerContext } from "@web3auth/modal-react-hooks";
import web3AuthContextConfig from "./wallet.tsx";

import ConnectWeb3AuthButton from './components/ConnectWeb3AuthButton';
import TopicsTab from './components/TopicsTab';
import StatementsTab from './components/StatementsTab';
import VoteTab from './components/VoteTab';
import ReportTab from './components/ReportTab';
import { styles } from './components/styles';

function PolisClone() {
  const [topics, setTopics] = useState([]);
  const [statements, setStatements] = useState([]);
  const [newTopic, setNewTopic] = useState('');
  const [newStatement, setNewStatement] = useState('');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [currentStatementIndex, setCurrentStatementIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('topics');

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
          <ConnectWeb3AuthButton />
          
          <p className="subtitle">Create topics, make statements, vote, and generate reports</p>

          <div className="tabs">
            <button className={activeTab === 'topics' ? 'active' : ''} onClick={() => setActiveTab('topics')}>Topics</button>
            <button className={activeTab === 'statements' ? 'active' : ''} onClick={() => setActiveTab('statements')}>Statements</button>
            <button className={activeTab === 'vote' ? 'active' : ''} onClick={() => setActiveTab('vote')}>Vote</button>
            <button className={activeTab === 'report' ? 'active' : ''} onClick={() => setActiveTab('report')}>Report</button>
          </div>

          <div className="content">
            {activeTab === 'topics' && (
              <TopicsTab 
                newTopic={newTopic}
                setNewTopic={setNewTopic}
                addTopic={addTopic}
                topics={topics}
              />
            )}

            {activeTab === 'statements' && (
              <StatementsTab 
                selectedTopic={selectedTopic}
                setSelectedTopic={setSelectedTopic}
                newStatement={newStatement}
                setNewStatement={setNewStatement}
                addStatement={addStatement}
                statements={statements}
                topics={topics}
              />
            )}

            {activeTab === 'vote' && (
              <VoteTab 
                currentStatementIndex={currentStatementIndex}
                statements={statements}
                vote={vote}
              />
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

          <style jsx>{styles}</style>
        </WalletServicesProvider>
      </Web3AuthProvider>
    </div>
  );
}

export default PolisClone;