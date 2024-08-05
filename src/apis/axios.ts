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
    //config.headers['approval_key'] = getCookie('approvalKey');
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
