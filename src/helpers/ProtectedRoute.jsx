import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ token, redirect = '/', children }) => {
  if (!token) return <Navigate to={redirect} />;

  return children;
};

export default ProtectedRoute;
