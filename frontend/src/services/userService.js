import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const login = async (credentials) => {
  const { data } = await axios.post(`${API_URL}/api/users/login`, credentials);
  return data;
};
