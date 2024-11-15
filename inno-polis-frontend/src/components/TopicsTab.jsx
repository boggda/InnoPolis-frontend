import React from 'react';
import { useWeb3Auth } from "@web3auth/modal-react-hooks";

const TopicsTab = ({ newTopic, setNewTopic, newDescription, setNewDescription, addTopic, topics }) => {
  const {isConnected, connect, addAndSwitchChain, userInfo, provider, web3Auth, authenticateUser } = useWeb3Auth();

  return (
    <div className="topics">
      <h2>Topics</h2>
      <div className="input-group">
        <input
          type="text"
          value={newTopic}
          onChange={(e) => setNewTopic(e.target.value)}
          placeholder="Enter a new topic"
        />
        <input
          type="text"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder="Enter a description"
        />
        <button onClick={() => addTopic(provider)}>Add Topic</button>
      </div>
      <div className="topic-list">
        {topics.map(topic => (
          <div key={topic.id} className="topic-card">
            <h3>{topic.title}</h3>
            <p>{topic.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopicsTab; 