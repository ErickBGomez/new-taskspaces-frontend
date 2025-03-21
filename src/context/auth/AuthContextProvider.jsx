import { App } from 'antd';
import { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import PropTypes from 'prop-types';

const AuthContextProvider = ({ children }) => {
  const { message } = App.useApp();
  const [user, setUser] = useState(() => {
    const storedUser =
      localStorage.getItem('user') || sessionStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(
    localStorage.getItem('token') || sessionStorage.getItem('token') || ''
  );
  const [rememberMe, setRememberMe] = useState(() => {
    const storedRememberMe =
      localStorage.getItem('rememberMe') ||
      sessionStorage.getItem('rememberMe');
    return storedRememberMe ? JSON.parse(storedRememberMe) : false;
  });

  useEffect(() => {
    if (token) {
      if (rememberMe) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('rememberMe', JSON.stringify(rememberMe));
      } else {
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('user', JSON.stringify(user));
        sessionStorage.setItem('rememberMe', JSON.stringify(rememberMe));
      }
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('rememberMe');
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('rememberMe');
    }
  }, [token, user, rememberMe]);

  const login = (userData, authToken, remember) => {
    setUser(userData);
    setToken(authToken);
    setRememberMe(remember);
  };

  const logout = () => {
    if (token) {
      message.error('Your session has expired. Please log in again.');
    }

    setUser(null);
    setToken('');
    setRememberMe(false);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContextProvider;
