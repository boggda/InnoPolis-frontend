export const processVoteService = (statements, currentStatementIndex, voteType) => {
  if (currentStatementIndex >= statements.length) {
    return null;
  }

  const updatedStatements = statements.map((statement, index) =>
    index === currentStatementIndex
      ? {
          ...statement,
          votes: {
            ...statement.votes,
            [voteType]: statement.votes[voteType] + 1
          }
        }
      : statement
  );

  // Here you can add API calls when you implement backend
  // await api.post(`/statements/${statementId}/vote`, { voteType });

  return updatedStatements;
}; 