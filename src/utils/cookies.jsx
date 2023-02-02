import { Cookies } from 'react-cookie';

const REFRESH_TOKEN = 'RefreshToken';

const ACCESS_TOKEN = 'AccessToken';

const NICKNAME = 'nickname';

const cookies = new Cookies();

export const setRefreshToken = (token) => {
  // console.log('refresh', token);

  const expireDate = new Date();
  expireDate.setMinutes(expireDate.getMinutes() + 3);

  // const today = new Date();
  // const expireDate = today.setDate(today.getDate() + 14);

  return cookies.set(REFRESH_TOKEN, token, {
    sameSite: 'strict',
    path: '/',
    expires: expireDate,
    // expires: new Date(expireDate),
  });
};

export const setAccessToken = (token) => {
  // console.log('token', token);

  const expireDate = new Date();
  // expireDate.setMinutes(expireDate.getMinutes() + 60);
  expireDate.setMinutes(expireDate.getMinutes() + 1);
  cookies.set(ACCESS_TOKEN, token, {
    path: '/',
    expires: expireDate,
  });

  console.log(expireDate);
};

export const setNicknameCookie = (nick) => {
  const expireDate = new Date();
  // expireDate.setMinutes(expireDate.getMinutes() + 60);
  expireDate.setMinutes(expireDate.getMinutes() + 3);
  cookies.set(NICKNAME, nick, {
    path: '/',
    expires: expireDate,
  });
};

export const getRefreshToken = () => {
  return cookies.get(REFRESH_TOKEN);
};

export const getAccessToken = () => {
  return cookies.get(ACCESS_TOKEN);
};

export const getNicknameCookie = () => {
  return cookies.get(NICKNAME);
};

export const removeCookie = () => {
  cookies.remove(REFRESH_TOKEN);
  cookies.remove(ACCESS_TOKEN);
  cookies.remove(NICKNAME);
};
