import { App } from 'antd';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/auth/AuthContext';
import getHeaders from '../helpers/api/header';

const API_URL = import.meta.env.VITE_API_URL;

const usePutData = (route, token = '') => {
  const { message } = App.useApp();
  const { logout } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const putData = async (newData) => {
    setLoading(true);
    setError(null);

    const headers = getHeaders(token);

    try {
      const response = await fetch(`${API_URL}/${route}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(newData),
      });

      if (response.status === 401) {
        logout();
        return;
      }

      const result = await response.json();

      if (!response.ok) {
        throw result;
      }

      return result;
    } catch (e) {
      setError(e.message || 'An error occurred');
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return { putData, error, loading };
};

export default usePutData;
