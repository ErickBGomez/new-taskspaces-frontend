import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth/AuthContext';
import usePostData from './usePostData';
import { useCreateTask as useSocketCreateTask } from './socketio/useTask';

const useCreateTask = (workspaceId, projectId) => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    createTask: socketCreateTask,
    loading,
    error,
  } = useSocketCreateTask(projectId, token);

  const createTask = async (data) => {
    try {
      const result = await socketCreateTask(data);

      if (!error) {
        navigate(`/w/${workspaceId}/p/${projectId}/t/${result.content._id}`);
      }
    } catch (e) {
      throw new Error(e);
    }
  };

  return { createTask, loading, error };
};

export default useCreateTask;
