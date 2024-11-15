export const generateReportService = (topicId, statements) => {
  const topicStatements = statements.filter(s => s.topicId === topicId);
  const totalVotes = topicStatements.reduce(
    (acc, s) => acc + s.votes.agree + s.votes.disagree + s.votes.skip,
    0
  );
  const mostAgreed = topicStatements.sort((a, b) => b.votes.agree - a.votes.agree)[0];

  return {
    totalVotes,
    statementsCount: topicStatements.length,
    mostAgreed
  };
}; 