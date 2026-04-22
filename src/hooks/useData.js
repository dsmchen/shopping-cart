import { useState, useEffect } from 'react';

export default function useData(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    fetch(url)
      .then((response) => {
        if (response.status >= 400) {
          throw new Error('Server Error');
        }
        return response.json();
      })
      .then((json) => {
        if (!ignore) {
          setError(null);
          setData(json);
        }
      })
      .catch((error) => {
        setData(null);
        setError(error);
        console.error(error);
      })
      .finally(() => setLoading(false));
    return () => {
      ignore = true;
    };
  }, [url]);

  return { data, error, loading };
}
