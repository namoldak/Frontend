/* eslint-disable react-hooks/rules-of-hooks */
// 외부 모듈

// 내부 모듈
import useToast from 'hooks/useToast';
import { instance } from './core/axios';

const SignUp = async (data) => {
  try {
    const response = await instance.post('/auth/signup', data);
    return response;
  } catch (error) {
    useToast('회원가입이 실패했습니다. 다시 시도해주세요.', 'error');
    // window.location.reload();
  }
  return null;
};

const Login = async (data) => {
  try {
    const response = await instance.post('/auth/login', data);
    return response;
  } catch (error) {
    useToast('로그인에 실패했습니다. 다시 한번 시도해주세요.', 'error');
  }
  return null;
};

// 카카오 로그인
// code: 카카오 인증 코드
const KakaoLogin = async (code) => {
  try {
    console.log(code);
    const response = await instance.get(`auth/kakao/callback?code=${code}`);
    console.log(response);
    return response;
  } catch (error) {
    useToast('에러가 발생했습니다', 'error');
  }
  return null;
};

// 닉네임 중복 확인
const checkNickName = async (nickname) => {
  try {
    const response = await instance.post(
      `/auth/nicknameCheck?nickname=${nickname}`,
    );
    return response;
  } catch (error) {
    useToast('에러가 발생했습니다', 'error');
  }
  return null;
};

// 이메일 중복 확인
const checkEmail = async (email) => {
  try {
    const response = await instance.post(`/auth/emailCheck?email=${email}`);
    return response;
  } catch (error) {
    useToast('에러가 발생했습니다', 'error');
  }
  return null;
};

const authAPI = {
  Login,
  SignUp,
  KakaoLogin,
  checkNickName,
  checkEmail,
};

export default authAPI;
