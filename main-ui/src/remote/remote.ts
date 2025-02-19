import axios, { AxiosInstance, AxiosResponse } from 'axios';

// 定义通用响应结构
interface ApiResponse<T> {
  status: string;
  message: string;
  data: T;
}

let token = '';
export const setToken = (newToken: string) => {
  token = newToken;
};

const remote: AxiosInstance = axios.create({
  baseURL: '/api',
});

remote.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

remote.interceptors.response.use(
  <T>(response: AxiosResponse<ApiResponse<T>>) => {
    return response.data as unknown as AxiosResponse<ApiResponse<T>>;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default remote;
