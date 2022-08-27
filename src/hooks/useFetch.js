import { useEffect, useState } from 'react';

const useFetch = ({ url }) => {

  console.log(url)

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { loading, error, data };
};

export default useFetch;
