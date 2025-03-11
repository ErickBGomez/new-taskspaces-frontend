import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import ColumnTaskCard from '../ColumnTaskCard/ColumnTaskCard';
import TaskStatus from '../../../TaskStatus/TaskStatus';
import './ColumnStatus.scss';
import { Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { TaskContext } from '../../../../context/task/TaskContext';
import useCreateTask from '../../../../hooks/createTask';

export default function ColumnStatus({ status }) {
  const { tasks } = useContext(TaskContext);
  const { workspaceId, projectId } = useParams();
  const { createTask } = useCreateTask(workspaceId, projectId);

  const handleAddNewTask = async () => {
    try {
      await createTask({ title: 'New Task' });
    } catch (e) {
      message.error("Couldn't create a new task. Please try again.");
    }
  };

  if (!status) return null;

  const filteredTasks = tasks.filter((task) => task.status === status);

  const taskCards = filteredTasks.map((task, index) => (
    <ColumnTaskCard key={index} task={task} />
  ));

  return (
    <>
      <div className="columnstatus">
        <div className="columnstatus-container">
          <div className="columnstatus-list">
            <TaskStatus status={status} />
          </div>
          <div className="columnstatus-tasks">{taskCards}</div>
          <div className="columnstatus-addnew">
            <Button type="link" onClick={handleAddNewTask}>
              Add new task <PlusOutlined style={{ width: '12px' }} />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
