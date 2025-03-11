import { useContext } from 'react';
import { Skeleton } from 'antd';
import { AuthContext } from '../../context/auth/AuthContext';
import useFetchData from '../../hooks/useFetchData';
import { useNavigate } from 'react-router-dom';

export const WorkspaceAuth = () => {
  const { token } = useContext(AuthContext);
  const { data, loading, error } = useFetchData('workspaces', token);
  const navigate = useNavigate();

  if (loading) {
    return <Skeleton active />;
  }

  if (error) return <div>Error: {error.message}</div>;

  if (data && data.content.length === 0) {
    // Create first workspace here
    navigate('/w-create');
  }

  if (data && data.content.length > 0) {
    // Redirect to first workspace
    navigate(`/w/${data.content[0]._id}`);
  }
};
