// eslint-disable-next-line import/no-cycle
import { instance } from 'api/core/axios';
import { Cookies } from 'react-cookie';

const REFRESH_TOKEN = 'RefreshToken';

const ACCESS_TOKEN = 'AccessToken';

const NICKNAME = 'nickname';

const cookies = new Cookies();

export const setRefreshToken = (token) => {
  const today = new Date();
  const expireDate = today.setDate(today.getDate() + 7);

  return cookies.set(REFRESH_TOKEN, token, {
    sameSite: 'strict',
    path: '/',
    expires: new Date(expireDate),
  });
};

export const setAccessToken = (token) => {
  const expireDate = new Date();
  expireDate.setMinutes(expireDate.getMinutes() + 120);

  setTimeout(() => {
    instance.post('/auth/issue/token').then((response) => {
      setAccessToken(response.headers.accesstoken);
    });
  }, 2 * 60 * 60 * 1000 - 10 * 60 * 1000);

  cookies.set(ACCESS_TOKEN, token, {
    path: '/',
    expires: expireDate,
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

export const getNicknameCookie = () => {
  return cookies.get(NICKNAME);
};

export const removeCookie = () => {
  cookies.remove(REFRESH_TOKEN);
  cookies.remove(ACCESS_TOKEN);
  cookies.remove(NICKNAME);
};
