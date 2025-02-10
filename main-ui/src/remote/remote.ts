import axios from 'axios';

let token = '';
export const setToken = (newToken: string) => {
  token = newToken;
};

const remote = axios.create({
  baseURL: '/api',
});

remote.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

remote.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default remote;
