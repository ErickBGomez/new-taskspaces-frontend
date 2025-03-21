import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/auth/AuthContext';
import { App } from 'antd';
import getHeaders from '../helpers/api/header';

const API_URL = import.meta.env.VITE_API_URL;

const useFetchData = (route, token) => {
  const { message } = App.useApp();
  const { logout } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const headers = getHeaders(token);

        const response = await fetch(`${API_URL}/${route}`, {
          method: 'GET',
          headers,
        });

        if (response.status === 401) {
          logout();
          return;
        }

        const result = await response.json();
        setData(result);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [route]);

  return { data, loading, error };
};

export default useFetchData;
