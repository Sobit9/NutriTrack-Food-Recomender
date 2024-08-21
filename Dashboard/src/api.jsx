// // src/api.js
// import axios from 'axios';

// const instance = axios.create({
//   baseURL: 'http://localhost:5000', // Replace with your backend URL
// });

// // Add a request interceptor to include the token in the headers
// instance.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// }, (error) => {
//   return Promise.reject(error);
// });

// export default instance;




// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://localhost:5000',
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// }, (error) => {
//   return Promise.reject(error);
// });

// export default api;






import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Fix template literal
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;


