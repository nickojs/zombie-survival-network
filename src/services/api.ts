import axios from 'axios';

let baseURL: string = '';

switch (process.env.NODE_ENV) {
  case 'production':
    baseURL = <string>process.env.REACT_APP_PROD_API;
    break;
  case 'development':
    baseURL = <string>process.env.REACT_APP_DEV_API;
    break;
  default:
    break;
}

const api = axios.create({
  baseURL,
  responseType: 'json'
});

api.interceptors.request.use(
  async (config) => {
    const existingToken = localStorage.getItem('token');

    if (existingToken) {
      config.headers.auth = existingToken;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
