import { Cookies } from 'react-cookie';

const TOKEN_ID = 'my_token';

const NICKNAME = 'nickname';

const cookies = new Cookies();

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

export const getCookie = () => {
  return cookies.get(TOKEN_ID);
};

export const getNicknameCookie = () => {
  return cookies.get(NICKNAME);
};

export const removeCookie = () => {
  return cookies.remove('my_token', 'nickname');
};
