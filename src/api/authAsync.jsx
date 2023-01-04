import { instance } from './core/axios';

const SignUp = async (data) => {
  try {
    const response = await instance.post('/auth/signup', data);
    // console.log('postSignup response:', response);
    return response;
  } catch (error) {
    console.log('postSignup response error:', error);
    // alert('회원가입이 실패했습니다. 다시 시도해주세요.');
    window.location.reload();
  }
  return null;
};

const Login = async (data) => {
  try {
    // console.log('서버', data);
    const response = await instance.post('/auth/login', data);
    // console.log('Login response:', response);
    return response;
  } catch (error) {
    // console.log('Login response error:', error);
    alert('로그인에 실패했습니다. 다시 한번 시도해주세요.');
  }
  return null;
};

// 카카오 로그인
// code: 카카오 인증 코드
const KakaoLogin = async (code) => {
  try {
    const response = await instance.post(`/api/user/loginKakao?code=${code}`);
    return response;
  } catch (error) {
    alert('에러가 발생했습니다', 'error');
  }
  return null;
};

const checkNickName = async (data) => {
  try {
    console.log('서버 nick', data);
    const response = await instance.post(`/auth/signup`, data);
    console.log('서버 nick response', response);
    return response;
  } catch (error) {
    alert('에러가 발생했습니다', 'error');
  }
  return null;
};

const authAPI = {
  Login,
  SignUp,
  KakaoLogin,
  checkNickName,
};

export default authAPI;
