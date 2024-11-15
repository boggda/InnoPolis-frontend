import React from 'react';

const ReportTab = ({ selectedTopic, setSelectedTopic, topics, generateReport }) => {
  return (
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
  );
};

export default ReportTab; 