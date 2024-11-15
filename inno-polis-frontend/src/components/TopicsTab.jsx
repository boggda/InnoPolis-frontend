import React from 'react';

const TopicsTab = ({ newTopic, setNewTopic, addTopic, topics }) => {
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
  );
};

export default TopicsTab; 