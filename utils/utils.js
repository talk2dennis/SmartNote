// Utility function to format the creation date
export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString();
};