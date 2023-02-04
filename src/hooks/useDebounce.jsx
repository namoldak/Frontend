import React, { useCallback, useEffect, useRef } from 'react';

const useDebounce = (callback, delay) => {
  const latestCallback = useRef();
  const latestTimeout = useRef();

  useEffect(() => {
    latestCallback.current = callback;
  }, [callback]);

  return () => {
    if (latestTimeout.current) {
      clearTimeout(latestTimeout.current);
    }

    latestTimeout.current = setTimeout(() => {
      latestCallback.current();
    }, delay);
  };
};

export default useDebounce;

// function useDebounceValue({ value, delay }) {
//   const [debouncedValue, setDebouncedValue] = useState(value);
//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedValue(value);
//     }, delay);
//     return () => {
//       clearTimeout(handler);
//     };
//   }, [value, delay]);
//   return debouncedValue;
// }

// export default useDebounceValue;
