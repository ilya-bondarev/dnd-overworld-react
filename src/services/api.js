import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const getToken = () => {
  return localStorage.getItem('token');
};

const getHeaders = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register/`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login/`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const logout = async () => {
  try {
    await axios.post(`${API_URL}/auth/logout/`, {}, { headers: getHeaders() });
    localStorage.removeItem('token');
  } catch (error) {
    throw error.response.data;
  }
};