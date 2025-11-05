import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  register: async (username, password) => {
    const response = await api.post('/users/register', { username, password });
    return response.data;
  },

  login: async (username, password) => {
    const response = await api.post('/users/login', { username, password });
    return response.data;
  },

  deleteCurrentUser: async () => {
    const response = await api.delete('/users/me');
    return response.data;
  },
};

// Journal Entry API calls
export const journalAPI = {
  getAllEntries: async () => {
    const response = await api.get('/api/journal-entries');
    return response.data;
  },

  getEntryById: async (id) => {
    const response = await api.get(`/api/journal-entries/${id}`);
    return response.data;
  },

  createEntry: async (entry) => {
    const response = await api.post('/api/journal-entries', entry);
    return response.data;
  },

  updateEntry: async (id, entry) => {
    const response = await api.put(`/api/journal-entries/${id}`, entry);
    return response.data;
  },

  deleteEntry: async (id) => {
    await api.delete(`/api/journal-entries/${id}`);
  },
};

export default api;
