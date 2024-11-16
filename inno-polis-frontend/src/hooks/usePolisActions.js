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
  const [selectedTopic, setSelectedTopic] = useState('');
  const [currentStatementIndex, setCurrentStatementIndex] = useState(0);
  const [newDescription, setNewDescription] = useState('');
  const [activeTab, setActiveTab] = useState('topics');

  const [voteArray, setVoteArray] = useState({});

  const addTopic = async (provider, authType, authAddress, minValue) => {
    const topic = await addTopicService(newTopic, newDescription, topics, provider, authType, authAddress, minValue);
    if (topic) {
      setTopics([...topics, topic]);
      setNewTopic('');
    }
  };

  const addStatement = async (provider) => {
    const statement = await addStatementService(newStatement, selectedTopic, provider);
    if (statement) {
      setStatements([...statements, statement]);
      setNewStatement('');
    }
  };

  const addVote = async (statementId, voteType) => {
    console.log(statementId, voteType);
    //const statement = await addStatementService(newStatement, selectedTopic, provider);
    if (statementId !== null && voteType !== null) {
      voteArray[statementId] = voteType;
      console.log(voteArray);
      setVoteArray(voteArray);
      setCurrentStatementIndex(prevIndex => prevIndex + 1);
    }
  };


  const vote = async (provider) => {
    await processVoteService(voteArray, selectedTopic, provider);
    setVoteArray({});
    //window.location.reload();
    
    setStatements([...statements]);
    setCurrentStatementIndex(0);
    
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
    setStatements,
    
    // Actions
    addTopic,
    addStatement,
    vote,
    generateReport,
    newDescription,
    setNewDescription,
    addVote
  };
}; 