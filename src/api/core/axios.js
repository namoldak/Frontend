/* eslint-disable func-names */
// 외부 모듈
import axios from 'axios';

// 내부 모듈
import { getAccessToken } from '../../utils/cookies';

// 인스턴스 생성
// eslint-disable-next-line import/prefer-default-export
export const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

// 요청 타임아웃
instance.defaults.timeout = 2500;

// 인스턴스 request header Authorization 설정
instance.interceptors.request.use((config) => {
  if (config.headers === undefined) return;
  const token = getAccessToken();
  if (token) {
    config.headers.AccessToken = `${token}`;
  }
  // eslint-disable-next-line consistent-return
  return config;
});
