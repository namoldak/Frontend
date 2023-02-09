// eslint-disable-next-line import/no-cycle
import { instance } from 'api/core/axios';
import { Cookies } from 'react-cookie';
import axios from 'axios';

const REFRESH_TOKEN = 'RefreshToken';
const ACCESS_TOKEN = 'AccessToken';
const KAKAO_TOKEN = 'KakaoToken';
const NICKNAME = 'nickname';
const cookies = new Cookies();

export const setRefreshToken = (refreshToken) => {
  const today = new Date();
  const expireDate = today.setDate(today.getDate() + 7);

  setTimeout(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/auth/issue/token`, {
        headers: {
          RefreshToken: refreshToken,
        },
      })
      .then((response) => {
        setAccessToken(response.headers.accesstoken);
      });
  }, 25 * 60 * 1000);

  return cookies.set(REFRESH_TOKEN, refreshToken, {
    sameSite: 'strict',
    path: '/',
    expires: new Date(expireDate),
  });
};

export const setAccessToken = (token) => {
  const expireDate = new Date();
  expireDate.setMinutes(expireDate.getMinutes() + 30);

  cookies.set(ACCESS_TOKEN, token, {
    path: '/',
    expires: expireDate,
  });
};

export const setKakaoToken = (token) => {
  cookies.set(KAKAO_TOKEN, token, {
    path: '/',
  });
};

export const setNicknameCookie = (nick) => {
  const today = new Date();
  const expireDate = today.setDate(today.getDate() + 7);

  cookies.set(NICKNAME, nick, {
    path: '/',
    expires: new Date(expireDate),
  });
};

export const getRefreshToken = () => {
  return cookies.get(REFRESH_TOKEN);
};

export const getAccessToken = () => {
  return cookies.get(ACCESS_TOKEN);
};

export const getKakaoToken = () => {
  return cookies.get(KAKAO_TOKEN);
};

export const getNicknameCookie = () => {
  return cookies.get(NICKNAME);
};

export const removeCookie = () => {
  cookies.remove(REFRESH_TOKEN);
  cookies.remove(ACCESS_TOKEN);
  cookies.remove(KAKAO_TOKEN);
  cookies.remove(NICKNAME);
};
