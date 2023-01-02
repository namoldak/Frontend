import axios from 'axios';

export const postSignup = async (data) => {
  try {
    const response = await axios.post('/signup', data);
    console.log('postSignup response:', response);
    return response;
  } catch (error) {
    console.log('postSignup response error:', error);
    alert('회원가입이 실패했습니다. 다시 시도해주세요.');
    window.location.reload();
  }
};
