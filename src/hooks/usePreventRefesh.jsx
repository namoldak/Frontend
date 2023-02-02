/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from 'react';
import useToast from './useToast';

const usePreventRefresh = () => {
  // 새로고침 막기 변수
  const preventClose = (e) => {
    e.preventDefault();
    // useToast('새로고침을 할 수 없닭! 🐓');
    e.returnValue = ''; // chrome에서는 설정이 필요해서 넣은 코드
  };

  // 브라우저에 렌더링 시 한 번만 실행하는 코드
  useEffect(() => {
    (() => {
      window.addEventListener('beforeunload', preventClose);
    })();

    return () => {
      window.removeEventListener('beforeunload', preventClose);
    };
  }, []);
};

export default usePreventRefresh;
