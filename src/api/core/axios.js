import axios from 'axios';
import { getCookie } from '../../utils/cookies';

// 인스턴스 생성
// eslint-disable-next-line import/prefer-default-export
export const instance = axios.create({
  // baseURL: 'http://15.164.233.135:8080',

  baseURL: 'https://namoldak.com',

  // baseURL: 'http://13.209.84.31:8080',
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});

// 요청 타임아웃
instance.defaults.timeout = 2500;

// 인스턴스 request header Authorization 설정
instance.interceptors.request.use((config) => {
  if (config.headers === undefined) return;
  const token = getCookie();
  config.headers.Authorization = `${token}`;
  // eslint-disable-next-line consistent-return
  return config;
});

// Unauthorized Error 처리
axios.interceptors.response.use((error) => {
  if (error.response.status === 401) {
    alert('로그인이 만료되었습니다.', 'error');
    window.location.href('/login');
  }
});
