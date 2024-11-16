import React, { useState } from 'react';
import { useWeb3Auth } from "@web3auth/modal-react-hooks";

const VoteTab = ({ currentStatementIndex, statements, vote, addVote }) => {
  const [voteArray, setVoteArray] = useState([]);
  const {isConnected, connect, addAndSwitchChain, userInfo, provider, web3Auth, authenticateUser } = useWeb3Auth();

  return (
    <div className="vote">
      <h2>Vote</h2>
      {currentStatementIndex < statements.length ? (
        <div className="vote-card">
          <h3>Statement to Vote On</h3>
          <p>{statements[currentStatementIndex].content}</p>
          <div className="vote-buttons">
            <button className="agree" onClick={() => addVote(statements[currentStatementIndex].id, 1)}>Agree</button>
            <button className="disagree" onClick={() => addVote(statements[currentStatementIndex].id, 2)}>Disagree</button>
            <button className="skip" onClick={() => addVote(statements[currentStatementIndex].id, 0)}>Skip</button>
          </div>
        </div>
      ) : (
        <p className="no-statements">No more statements to vote on.</p>
      )}
      <button 
        className="submit-votes-button"
        onClick={() => vote(provider)}
      >
        Submit All Votes
      </button>
      <div className="vote-reminder">
        <h3 style={{ color: 'red', textAlign: 'center', padding: '10px' }}>
          ⚠️ DO NOT FORGET TO SUBMIT YOUR VOTES! ⚠️
        </h3>
      </div>
    </div>
  );
};

export default VoteTab; 