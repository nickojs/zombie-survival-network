import axios from 'axios';

let baseURL: string = '';

switch (process.env.NODE_ENV) {
  case 'production':
    baseURL = process.env.REACT_APP_PROD_API as string;
    break;
  case 'development':
    baseURL = process.env.REACT_APP_DEV_API as string;
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
    const existingToken = localStorage.getItem('auth_token');

    if (existingToken) {
      config.headers.auth = existingToken;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
