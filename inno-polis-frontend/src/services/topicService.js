export const addTopicService = async (newTopic, topics) => {
  if (!newTopic.trim()) {
    return null;
  }

  const topic = {
    id: Date.now(),
    title: newTopic.trim()
  };

  // Here you can add API calls when you implement backend
  // const response = await api.post('/topics', topic);
  // return response.data;

  return topic;
}; 