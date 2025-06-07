import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1'
});

// Add token to request header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const login = (credentials) => api.post('/auth/login', credentials);
export const register = (userData) => api.post('/auth/register', userData);
export const forgotPassword = (email) => api.post('/auth/forgot-password', { email });
export const resetPassword = (token, newPassword) => 
  api.post('/auth/reset-password', { token, newPassword });

// News APIs
export const getNews = (page = 0, size = 10) => 
  api.get(`/news/all?pageNum=${page}&pageSize=${size}`);
export const getNewsByTitle = (title, page = 0, size = 10) => 
  api.get(`/news/title?title=${encodeURIComponent(title)}&pageNum=${page}&pageSize=${size}`);
export const getNewsByCategory = (category, page = 0, size = 10) => 
  api.get(`/news/category?category=${category}&pageNum=${page}&pageSize=${size}`);
export const getNewsById = (id) => api.get(`/news/id?id=${id}`);
export const createNews = (newsData) => api.post('/news', newsData);
export const updateNews = (newsData) => api.put('/news', newsData);
export const updateNewsList = (newsList) => api.put('/news/list', newsList);
export const deleteNews = (id) => api.delete(`/news?id=${id}`);

// Planes APIs
export const getPlanes = (page = 0, size = 10) => 
  api.get(`/plane/all?pageNum=${page}&pageSize=${size}`);
export const getPlaneByName = (name, page = 0, size = 10) => 
  api.get(`/plane/name?name=${encodeURIComponent(name)}&pageNum=${page}&pageSize=${size}`);
export const getPlaneById = (id) => api.get(`/plane/id?id=${id}`);
export const createPlane = (planeData) => api.post('/plane', planeData);
export const updatePlane = (planeData) => api.put('/plane', planeData);
export const deletePlane = (id) => api.delete(`/plane?id=${id}`);

// Seats APIs
export const getSeatsByPlane = (planeId) => api.get(`/seat/plane?planeId=${planeId}`);
export const getSeatById = (id) => api.get(`/seat/id?id=${id}`);
export const createSeat = (seatData) => api.post('/seat', seatData);
export const updateSeat = (seatData) => api.put('/seat', seatData);
export const deleteSeat = (id) => api.delete(`/seat?id=${id}`);

// Flights APIs
export const getFlights = (page = 0, size = 10) => 
  api.get(`/flight/all?pageNum=${page}&pageSize=${size}`);
export const getFlightById = (id) => api.get(`/flight/id?id=${id}`);
export const createFlight = (flightData) => api.post('/flight', flightData);
export const updateFlight = (flightData) => api.put('/flight', flightData);
export const deleteFlight = (id) => api.delete(`/flight?id=${id}`);
export const searchFlights = (params) => 
  api.get('/flight/search', { params });
export const updateFlightDelay = (flightId, delayData) => 
  api.put(`/flight/${flightId}/delay`, delayData);
export const getFlightDelayHistory = (flightId) => 
  api.get(`/flight/${flightId}/delay-history`);

// Transactions APIs
export const getTransactions = (page = 0, size = 10) => 
  api.get(`/transaction/all?pageNum=${page}&pageSize=${size}`);
export const getTransactionById = (id) => 
  api.get(`/transaction/id?id=${id}`);
export const getTransactionsByConditions = (flightName, dateFrom, dateTo, status, page = 0, size = 10) => 
  api.get(`/transaction/conditions?flightName=${encodeURIComponent(flightName)}&dateFrom=${dateFrom}&dateTo=${dateTo}&status=${status}&pageNum=${page}&pageSize=${size}`);
export const getTransactionsByStatus = (status) => 
  api.get(`/transaction/status?statusEnum=${status}`);
export const createTransaction = (transactionData) => 
  api.post('/transaction', transactionData);
export const updateTransaction = (transactionData) => 
  api.put('/transaction', transactionData);
export const updateTransactions = (transactionList) => 
  api.put('/transaction/list', transactionList);
export const deleteTransaction = (id) => 
  api.delete(`/transaction?id=${id}`);
export const getTransactionsByFlight = (flightId) => 
  api.get(`/transaction/flight?flightId=${flightId}`);

export const getUserById = (userId) => 
  api.get(`/user/id?id=${userId}`);

export default api; 