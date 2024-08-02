import axios from 'axios';

const USER_API = 'https://api.jsonbin.io/v3/b/66a878a5e41b4d34e4190c12';
const DOCUMENTS_API = 'https://api.jsonbin.io/v3/b/66a87a90ad19ca34f88ecd65';
const CAREER_GOAL_API = 'https://api.jsonbin.io/v3/b/66a87a3ae41b4d34e4190ccc';

export const fetchUser = async () => {
  const response = await axios.get(USER_API);
  return response.data.record.data;
};

export const fetchDocuments = async () => {
  const response = await axios.get(DOCUMENTS_API);
  return response.data.record.data;
};

export const fetchCareerGoal = async () => {
  const response = await axios.get(CAREER_GOAL_API);
  return response.data.record.data[0];
};