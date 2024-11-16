import React, { useState } from 'react';

const VoteTab = ({ currentStatementIndex, statements, vote, addVote }) => {
  const [voteArray, setVoteArray] = useState([]);

  

  return (
    <div className="vote">
      <h2>Vote</h2>
      {currentStatementIndex < statements.length ? (
        <div className="vote-card">
          <h3>Statement to Vote On</h3>
          <p>{statements[currentStatementIndex].content}</p>
          <div className="vote-buttons">
            <button className="agree" onClick={() => addVote(currentStatementIndex, 1)}>Agree</button>
            <button className="disagree" onClick={() => addVote(currentStatementIndex, 2)}>Disagree</button>
            <button className="skip" onClick={() => addVote(currentStatementIndex, 0)}>Skip</button>
          </div>
        </div>
      ) : (
        <p className="no-statements">No more statements to vote on.</p>
      )}
      <button 
        className="submit-votes-button"
        onClick={() => vote()}
      >
        Submit All Votes
      </button>
    </div>
  );
};

export default VoteTab; 