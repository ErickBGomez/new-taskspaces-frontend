import { useEffect, useState } from 'react';
import SocketContext from './SocketContext';
import io from 'socket.io-client';

const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Initialize the socket connection
    const newSocket = io(import.meta.env.VITE_SOCKET_URL, {
      auth: {
        token: localStorage.getItem('token') || sessionStorage.getItem('token'),
      },
    }); // Replace with your server URL
    setSocket(newSocket);

    // Cleanup on component unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
