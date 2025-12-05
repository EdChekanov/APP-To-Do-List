import axios from 'axios';

const api = axios.create({
  baseURL: 'https://todo-redev.herokuapp.com/api/todos',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem('token') ||
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVkX2NoZWthbm92QGdtYWlsLmNvbSIsImlkIjoyMDA0LCJpYXQiOjE3NjQ5NjAzMjR9.UC9xEhMQO6oi_EDtb99L3kRyMjtL00UITAHrMaLBjcY';
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('❌ Ошибка запроса:', error);
    return Promise.reject(error);
  }
);

export default api;
