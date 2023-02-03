/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import useToast from './useToast';

const usePreventGoBack = () => {
  const location = useLocation();
  const history = createBrowserHistory();

  const preventGoBack = () => {
    history.push(null, '', location.href);
    useToast('뒤로 갈 수 없닭! 🐓');
  };

  // 브라우저에 렌더링 시 한 번만 실행하는 코드
  useEffect(() => {
    (() => {
      history.push(null, '', location.href);
      window.addEventListener('popstate', preventGoBack);
    })();

    return () => {
      window.removeEventListener('popstate', preventGoBack);
    };
  }, []);

  useEffect(() => {
    history.push(null, '', location.href);
  }, [location]);
};

export default usePreventGoBack;
