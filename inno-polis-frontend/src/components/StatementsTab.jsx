import React, { useEffect } from 'react';
import {conversationABI} from "../config/abi";
import Web3 from "web3";
import { useWeb3Auth } from "@web3auth/modal-react-hooks";


const StatementsTab = ({ selectedTopic, setSelectedTopic, newStatement, setNewStatement, addStatement, statements, topics, setStatements }) => {
  const {isConnected, connect, addAndSwitchChain, userInfo, provider, web3Auth, authenticateUser } = useWeb3Auth();

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

        for (let i = 0; i < statementsCount; i++) {
          const statement = await topicContract.methods.statements(i).call();
          fetchedStatements.push({
            id: i,
            content: statement.content,
            topicId: selectedTopic
          });
        }

        setStatements(fetchedStatements);
      } catch (error) {
        console.error('Error fetching statements:', error);
      }
    };

    if (selectedTopic && provider) {
      fetchTopicStatements();
      intervalId = setInterval(fetchTopicStatements, 5000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [selectedTopic, provider, setStatements]);

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