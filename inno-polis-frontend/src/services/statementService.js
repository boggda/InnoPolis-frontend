export const addStatementService = (newStatement, selectedTopic) => {
  if (!newStatement.trim() || selectedTopic === null) {
    return null;
  }

  const statement = {
    id: Date.now(),
    topicId: selectedTopic,
    content: newStatement.trim(),
    votes: { agree: 0, disagree: 0, skip: 0 }
  };

  // Here you can add API calls when you implement backend
  // const response = await api.post('/statements', statement);
  // return response.data;

  return statement;
}; 