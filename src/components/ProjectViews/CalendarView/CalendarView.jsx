import { useContext } from 'react';
import { Button, Calendar, message } from 'antd';
import CalendarTasks from '../CalendarView/CalendarTask/CalendarTask';
import { TaskContext } from '../../../context/task/TaskContext';
import { PlusOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import useCreateTask from '../../../hooks/createTask';
import './CalendarView.scss';

export default function CalendarView() {
  const { tasks } = useContext(TaskContext);
  const { workspaceId, projectId } = useParams();
  const { createTask } = useCreateTask(workspaceId, projectId);

  if (!workspaceId || !projectId) {
    console.error('Missing workspaceId or projectId.');
    return null;
  }

  const handleAddNewTask = async () => {
    try {
      await createTask({ title: 'New Task' });
    } catch (e) {
      message.error("Couldn't create a new task. Please try again.");
    }
  };

  const getTasksForDate = (date) => {
    const formattedDate = date.format('YYYY-MM-DD');
    const tasksDate = [];

    tasks.forEach((task) => {
      const taskDate = task.date?.split('T')[0];

      if (taskDate === formattedDate) {
        tasksDate.push(task);
      }
    });

    return tasksDate;
  };

  const dateCellRender = (date) => {
    const tasks = getTasksForDate(date);

    return (
      <div className="tasks-in-day">
        {tasks.map((task, index) => (
          <CalendarTasks key={index} task={task} />
        ))}
      </div>
    );
  };

  return (
    <div className="calendar-view">
      <Button
        className="add-new-task"
        type="primary"
        onClick={handleAddNewTask}
        icon={<PlusOutlined style={{ width: '12px' }} />}
      >
        Add new task
      </Button>
      <Calendar cellRender={dateCellRender} />
    </div>
  );
}
