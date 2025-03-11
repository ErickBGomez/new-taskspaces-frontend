import { useCallback, useEffect, useState } from 'react';
import io from 'socket.io-client';
import getHeaders from '../../helpers/api/header';

const socket = io(import.meta.env.VITE_SOCKET_URL);
const API_URL = import.meta.env.VITE_API_URL;

export const useTasks = (projectId, token, initialTasks = []) => {
  const [tasks, setTasks] = useState(initialTasks);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const headers = getHeaders(token);

      const response = await fetch(`${API_URL}/tasks/p/${projectId}`, {
        method: 'GET',
        headers,
      });
      // if (response.status === 401) {
      // logout();
      // message.error('Your session has expired. Please log in again.');
      // return;
      // }

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setTasks(data);
      return data;
    } catch (err) {
      setError(err);
      console.error('Failed to fetch messages:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Socket listeners for real-time updates
  useEffect(() => {
    const handleNewTask = (task) => {
      setTasks((prev) => [...prev, task]);
    };

    const handleUpdatedTask = (updatedTask) => {
      setTasks((prev) =>
        prev.map((task) => (task._id === updatedTask._id ? updatedTask : task))
      );
    };

    const handleDeletedTask = (id) => {
      setTasks((prev) => prev.filter((task) => task._id !== id));
    };

    // Socket event listeners
    socket.on('task:created', handleNewTask);
    socket.on('task:updated', handleUpdatedTask);
    socket.on('task:deleted', handleDeletedTask);

    // Cleanup
    return () => {
      socket.off('task:created', handleNewTask);
      socket.off('task:updated', handleUpdatedTask);
      socket.off('task:deleted', handleDeletedTask);
    };
  }, [tasks]);

  return {
    tasks,
    fetchTasks,
    loading,
    error,
  };
};

// Custom hook for creating a message
export const useCreateTask = (projectId, token) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createTask = useCallback(async (taskData) => {
    setLoading(true);
    setError(null);
    try {
      const headers = getHeaders(token);

      // REST API call
      const response = await fetch(`${API_URL}/tasks/p/${projectId}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      // Socket event for real-time broadcast
      socket.emit('task:create', data.content);

      return data;
    } catch (err) {
      setError(err);
      console.error('Failed to create task:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { createTask, loading, error };
};

// Custom hook for updating a message
export const useUpdateTask = (id, projectId, token) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateTask = useCallback(async (updateTaskData) => {
    setLoading(true);
    setError(null);
    try {
      const headers = getHeaders(token);

      // REST API call
      const response = await fetch(`${API_URL}/tasks/${id}/p/${projectId}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(updateTaskData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      // Socket event for real-time broadcast
      socket.emit('task:update', {
        id,
        ...data.content,
      });

      return data;
    } catch (err) {
      setError(err);
      console.error('Failed to update task:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { updateTask, loading, error };
};

// Custom hook for deleting a message
export const useDeleteTask = (id, projectId, token) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteTask = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const headers = getHeaders(token);

      // REST API call
      const response = await fetch(`${API_URL}/tasks/${id}/p/${projectId}`, {
        method: 'DELETE',
        headers,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      // Socket event for real-time broadcast
      socket.emit('task:delete', id);

      return data;
    } catch (err) {
      setError(err);
      console.error('Failed to delete task:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { deleteTask, loading, error };
};
