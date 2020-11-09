import { useEffect, useState } from 'react';

import { useToasts } from 'react-toast-notifications';

export const useFetch = (responseDataFunction, ref, initialValue) => {
  const [data, setData] = useState(initialValue);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { addToast } = useToasts();

  useEffect(() => {
    const fetchData = async () => {
      try {
        //throw new Error('Error here');
        const response = await responseDataFunction();
        if (ref.current) {
          setData(response);
          setIsLoading(false);
        }
      } catch (err) {
        setIsLoading(false);
        setError(true);
        addToast('Upps... some error here!', { appearance: 'error' });
      }
    };
    fetchData();
    return () => {
      ref.current = false;
    };
  }, [responseDataFunction, ref, addToast, data]);
  return { isLoading, error, data };
};
