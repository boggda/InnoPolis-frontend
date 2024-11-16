import "../config/abi"

export const addStatementService = async (newStatement, selectedTopic) => {
  if (!newStatement.trim() || !selectedTopic.trim()) {
    return null;
  }

  const statement = {
    id: Date.now(),
    topicId: selectedTopic,
    content: newStatement.trim(),
    votes: { agree: 0, disagree: 0, skip: 0 }
  };

  return statement;
}; 