import React from 'react';

const VoteTab = ({ currentStatementIndex, statements, vote }) => {
  return (
    <div className="vote">
      <h2>Vote</h2>
      {currentStatementIndex < statements.length ? (
        <div className="vote-card">
          <h3>Statement to Vote On</h3>
          <p>{statements[currentStatementIndex].content}</p>
          <div className="vote-buttons">
            <button className="agree" onClick={() => vote('agree')}>Agree</button>
            <button className="disagree" onClick={() => vote('disagree')}>Disagree</button>
            <button className="skip" onClick={() => vote('skip')}>Skip</button>
          </div>
        </div>
      ) : (
        <p className="no-statements">No more statements to vote on.</p>
      )}
    </div>
  );
};

export default VoteTab; 