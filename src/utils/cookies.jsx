import { Cookies } from 'react-cookie';

const REFRESH_TOKEN = 'refresh_token';

const TOKEN_ID = 'my_token';

const NICKNAME = 'nickname';

const cookies = new Cookies();

export const setRefreshToken = (refreshToken) => {
  const today = new Date();
  const expireDate = today.setDate(today.getDate() + 14);

  return cookies.set(REFRESH_TOKEN, refreshToken, {
    sameSite: 'strict',
    path: '/',
    expires: new Date(expireDate),
  });
};

export const setCookie = (token) => {
  const expireDate = new Date();
  expireDate.setMinutes(expireDate.getMinutes() + 60);
  cookies.set(TOKEN_ID, token, {
    path: '/',
    expires: expireDate,
  });
};

export const setNicknameCookie = (nick) => {
  const expireDate = new Date();
  expireDate.setMinutes(expireDate.getMinutes() + 60);
  cookies.set(NICKNAME, nick, {
    path: '/',
    expires: expireDate,
  });
};

export const getRefreshToken = () => {
  return cookies.get(REFRESH_TOKEN);
};

export const getCookie = () => {
  return cookies.get(TOKEN_ID);
};

export const getNicknameCookie = () => {
  return cookies.get(NICKNAME);
};

export const removeCookie = () => {
  cookies.remove('refresh_token');
  cookies.remove('my_token');
  cookies.remove('nickname');
};
