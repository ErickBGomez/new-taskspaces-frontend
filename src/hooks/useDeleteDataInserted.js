import { App } from 'antd';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/auth/AuthContext';
import getHeaders from '../helpers/api/header';
import { replaceParams } from '../helpers/strings';

const API_URL = import.meta.env.VITE_API_URL;

const useDeleteDataInserted = (route, token = '') => {
  const { message } = App.useApp();
  const { logout } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteData = async (params) => {
    setLoading(true);
    setError(null);

    const fullRoute = replaceParams(route, params);

    const headers = getHeaders(token);

    try {
      const response = await fetch(`${API_URL}/${fullRoute}`, {
        method: 'DELETE',
        headers,
      });

      if (response.status === 401) {
        logout();
        message.error('Your session has expired. Please log in again.');
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

  return { deleteData, loading, error };
};

export default useDeleteDataInserted;
