import React, { useEffect, useState } from 'react';
import {conversationABI} from "../config/abi";
import Web3 from "web3";
import { useWeb3Auth } from "@web3auth/modal-react-hooks";
import { useSearchParams } from 'react-router-dom';


const StatementsTab = ({ selectedTopic, setSelectedTopic, newStatement, setNewStatement, addStatement, statements, topics, setStatements }) => {
  const {isConnected, connect, addAndSwitchChain, userInfo, provider, web3Auth, authenticateUser } = useWeb3Auth();
  const [topicDetails, setTopicDetails] = useState({ title: '', description: '', deadline: '' });
  const [inputValue, setInputValue] = useState('');
  
  var url = new URL(window.location.href);
  const initialAddr = url.searchParams.get("addr");

  useEffect(() => {
    if (initialAddr) {
      setInputValue(initialAddr);
      setSelectedTopic(initialAddr);
    }
  }, [initialAddr, setSelectedTopic]);

  useEffect(() => {
    let intervalId;    
    const fetchTopicStatements = async () => {
      try {
        const web3 = new Web3(provider);
        const fromAddress = (await web3.eth.getAccounts())[0];
        const topicContract = new web3.eth.Contract(
          conversationABI,
          selectedTopic
        );

        const statementsCount = await topicContract.methods.statementCount().call();
        const fetchedStatements = [];
        const votes = await topicContract.methods.getVotesData(fromAddress).call();

        for (let i = 0; i < statementsCount; i++) {
          let isPushRequired = true;
          const statement = await topicContract.methods.statements(i).call();
          for (let j = 0; j < votes.length; j++) {
            if (Number(votes[j].statementId) === i) {
              isPushRequired = false;
              break;
            }
          }
          if (isPushRequired) {
            fetchedStatements.push({
              id: i,
              content: statement.content,
              topicId: selectedTopic
            }); 
          }
        }

        setStatements(fetchedStatements);
      } catch (error) {
        console.error('Error fetching statements:', error);
      }
    };

    const fetchTopicDetails = async () => {
      try {
        const web3 = new Web3(provider);
        const topicContract = new web3.eth.Contract(
          conversationABI,
          selectedTopic
        );

        const title = await topicContract.methods.title().call();
        const description = await topicContract.methods.description().call();
        const deadline = await topicContract.methods.deadline().call();

        setTopicDetails({
          title,
          description,
          deadline: new Date(Number(deadline) * 1000).toLocaleString() // Convert Unix timestamp to readable date
        });
      } catch (error) {
        console.error('Error fetching topic details:', error);
      }
    };

    if (selectedTopic && provider) {
      fetchTopicStatements();
      fetchTopicDetails();
      intervalId = setInterval(fetchTopicStatements, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [selectedTopic, provider, setStatements]);

  return (
    <div className="statements">
      <div className="input-group topic-input">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setSelectedTopic(e.target.value);
          }}
          placeholder="Enter topic address"
          className="topic-address-input"
        />
      </div>
      {selectedTopic && topicDetails.title && (
        <div className="topic-details">
          <h1>{topicDetails.title}</h1>
          <p className="description">{topicDetails.description}</p>
          <p className="deadline">Deadline: {topicDetails.deadline}</p>
        </div>
      )}
      <h2>Statements</h2>
      <div className="input-group">
        <input
          type="text"
          value={newStatement}
          onChange={(e) => setNewStatement(e.target.value)}
          placeholder="Enter a new statement"
        />
        <button onClick={() => addStatement(provider)}>Add Statement</button>
      </div>
    </div>
  );
};

export default StatementsTab; 