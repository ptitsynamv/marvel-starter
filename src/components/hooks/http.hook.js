import { useState, useCallback } from 'react';

export const useHttp = () => {
  const [stateProcess, setStateProcess] = useState('waiting');

  const request = useCallback(
    async (
      url,
      method = 'GET',
      body = null,
      headers = { 'Content-Type': 'application/json' }
    ) => {
      setStateProcess('loading');

      try {
        const response = await fetch(url, { method, body, headers });
        if (!response.ok) {
          throw new Error(`Could not fetch ${url}, status: ${response.status}`);
        }

        const data = await response.json();

        return data;
      } catch (e) {
        setStateProcess('error');

        throw e;
      }
    },
    []
  );

  const clearError = useCallback(() => {
    setStateProcess('loading');
  }, []);

  return { request, clearError, stateProcess, setStateProcess };
};
