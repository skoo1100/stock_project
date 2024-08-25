import axios from 'axios';
import { getCookie } from '@utils/cookie';

const instance = axios.create({
  baseURL: 'http://localhost:5173/api',
  withCredentials: true,
  timeout: 5000,
});

instance.interceptors.request.use(
  (config) => {
    config.headers['Content-Type'] = 'application/json; charset=UTF-8';
    config.headers['authorization'] = `Bearer ${getCookie('accessToken')}`;
    config.headers['appkey'] = import.meta.env.VITE_KIS_INVESTMENT_API_KEY;
    if (config.url === '/oauth2/Approval') {
      config.headers['secretkey'] = import.meta.env.VITE_KIS_INVESTMENT_API_SECRET;
    } else {
      config.headers['appsecret'] = import.meta.env.VITE_KIS_INVESTMENT_API_SECRET;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('Response Error:', error.response); // 에러 응답 확인
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const { data, status } = error.response;
        return Promise.reject({
          errorMessage: data.errorMessage || 'Unknown error occurred',
          errorCode: data.errorCode || 'UNKNOWN_ERROR',
          statusCode: status,
        });
      } else {
        return Promise.reject({
          errorMessage: 'No response received from server',
          errorCode: 'NO_RESPONSE',
        });
      }
    } else {
      return Promise.reject({
        errorMessage: 'An unexpected error occurred',
        errorCode: 'UNEXPECTED_ERROR',
      });
    }
  },
);

export default instance;
