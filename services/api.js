import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);
export const getMatches = () => API.get('/matches');
export const createMatch = (data) => API.post('/matches', data);
export const getLeaderboard = () => API.get('/leaderboard/top-runs');
