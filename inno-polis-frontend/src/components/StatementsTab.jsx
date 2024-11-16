import React from 'react';
import { useWeb3Auth } from "@web3auth/modal-react-hooks";

const StatementsTab = ({ selectedTopic, setSelectedTopic, newStatement, setNewStatement, addStatement, statements, topics }) => {
  const {isConnected, connect, addAndSwitchChain, userInfo, provider, web3Auth, authenticateUser } = useWeb3Auth();
  return (
    <div className="statements">
      <h2>Statements</h2>
      <div className="input-group">
        <input
          type="text"
          value={selectedTopic || ''}
          onChange={(e) => setSelectedTopic(e.target.value)}
          placeholder="Enter topic address"
        />
        <input
          type="text"
          value={newStatement}
          onChange={(e) => setNewStatement(e.target.value)}
          placeholder="Enter a new statement"
        />
        <button onClick={() => addStatement(provider)}>Add Statement</button>
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
  );
};

export default StatementsTab; 