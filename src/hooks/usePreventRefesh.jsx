/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from 'react';

const usePreventRefresh = () => {
  const preventClose = (e) => {
    e.preventDefault();
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
  });
};

export default usePreventRefresh;
