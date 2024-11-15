import { useState } from 'react';
import { addTopicService } from '../services/topicService';
import { addStatementService } from '../services/statementService';
import { processVoteService } from '../services/voteService';
import { generateReportService } from '../services/reportService';


export const usePolisActions = () => {
  const [topics, setTopics] = useState([]);
  const [statements, setStatements] = useState([]);
  const [newTopic, setNewTopic] = useState('');
  const [newStatement, setNewStatement] = useState('');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [currentStatementIndex, setCurrentStatementIndex] = useState(0);
  const [newDescription, setNewDescription] = useState('');
  const [activeTab, setActiveTab] = useState('topics');

  const addTopic = async (provider) => {
    const topic = await addTopicService(newTopic, newDescription, topics, provider);
    if (topic) {
      setTopics([...topics, topic]);
      setNewTopic('');
    }
  };

  const addStatement = () => {
    const statement = addStatementService(newStatement, selectedTopic);
    if (statement) {
      setStatements([...statements, statement]);
      setNewStatement('');
    }
  };

  const vote = (voteType) => {
    const updatedStatements = processVoteService(statements, currentStatementIndex, voteType);
    if (updatedStatements) {
      setStatements(updatedStatements);
      setCurrentStatementIndex(prevIndex => prevIndex + 1);
    }
  };

  const generateReport = (topicId) => {
    const report = generateReportService(topicId, statements);
    
    return (
      <div className="report">
        <p><strong>Total votes:</strong> {report.totalVotes}</p>
        <p><strong>Number of statements:</strong> {report.statementsCount}</p>
        {report.mostAgreed && (
          <div className="most-agreed">
            <h4>Most agreed statement:</h4>
            <p>"{report.mostAgreed.content}"</p>
            <p>
              Votes: {report.mostAgreed.votes.agree} agree, 
              {report.mostAgreed.votes.disagree} disagree, 
              {report.mostAgreed.votes.skip} skip
            </p>
          </div>
        )}
      </div>
    );
  };

  return {
    // State
    topics,
    statements,
    newTopic,
    newStatement,
    selectedTopic,
    currentStatementIndex,
    activeTab,
    
    // Setters
    setNewTopic,
    setNewStatement,
    setSelectedTopic,
    setActiveTab,
    
    // Actions
    addTopic,
    addStatement,
    vote,
    generateReport,
    newDescription,
    setNewDescription
  };
}; 