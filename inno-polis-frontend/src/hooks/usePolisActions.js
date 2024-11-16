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
  const [contractAddress, setContractAddress] = useState('');

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

  const generateReport = async (contractAddress, provider) => {
    return await generateReportService(contractAddress, provider);
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
    contractAddress,
    
    // Setters
    setNewTopic,
    setNewStatement,
    setSelectedTopic,
    setActiveTab,
    setStatements,
    setContractAddress,
    
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