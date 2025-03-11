import { useState } from 'react';
import { TaskContext } from './TaskContext';
import PropTypes from 'prop-types';

const TaskContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const saveTasks = (newTasks) => {
    setTasks(newTasks);
  };

  return (
    <TaskContext.Provider value={{ tasks, saveTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

TaskContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TaskContextProvider;
