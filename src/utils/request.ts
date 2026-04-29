import axios from 'axios';

// API 基础地址配置（开发环境默认 localhost，生产环境需配置环境变量）
const API_BASE_URL = import.meta.env.VITE_STRAPI_URL || (import.meta.env.DEV ? 'http://localhost:1337' : '');

// 创建 Axios 实例
const service = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 10000,
});

// 请求拦截器
service.interceptors.request.use(config => {
  return config;
});

// 响应拦截器
service.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    console.error('请求异常：', error);
    return Promise.reject(error);
  }
);

export default service;