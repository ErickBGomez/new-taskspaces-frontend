import { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Collapse, App, Table } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Tag from '../../Tag/Tag';
import Profile from '../../Profile/Profile';
import { TaskContext } from '../../../context/task/TaskContext';
import './TableView.scss';
import useCreateTask from '../../../hooks/createTask';

export default function TableView() {
  const { tasks } = useContext(TaskContext);
  const { workspaceId, projectId } = useParams();
  const navigate = useNavigate();
  const { createTask } = useCreateTask(workspaceId, projectId);
  const { message } = App.useApp();

  const handleClick = (value) => {
    navigate(`/w/${workspaceId}/p/${projectId}/t/${value._id}`);
  };

  const handleAddNewTask = async () => {
    try {
      await createTask({ title: 'New Task' });
      message.success('New task created successfully!');
    } catch (e) {
      message.error(e.message || "Couldn't create a new task. Please try again.");
    }
  };

  const columns = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'index',
      render: (_, record, index) => index + 1,
      width: 38,
    },
    {
      title: 'Task Title',
      dataIndex: 'title',
      key: 'title',
      width: 240,
    },
    {
      title: 'Tag',
      dataIndex: 'tag',
      key: 'tag',
      render: (tag) => <Tag label={tag} />,
      width: 150,
    },
    {
      title: 'Due Date',
      dataIndex: 'date',
      key: 'date',
      render: (date) => date.split('T')[0],
      width: 100,
    },
    {
      title: 'Members',
      dataIndex: 'members',
      key: 'members',
      render: (members) => {
        return members.map((member) => {
          return <Profile key={member._id} user={member} />;
        });
      },
      width: 100,
    },
    // {
    //   title: 'Collaborators',
    //   dataIndex: 'collaborators',
    //   key: 'collaborators',
    //   render: (collaborators) => getTaskCollaborators(collaborators),
    //   width: 160,
    // },
  ];

  const getTasksByStatus = (status) => {
    return tasks.filter((task) => task.status === status);
  };

  console.log(tasks);
  console.log(getTasksByStatus('doing'));

  const collapseItems = ['pending', 'doing', 'done'].map((status) => ({
    key: status,
    label: status.charAt(0).toUpperCase() + status.slice(1),
    children: (
      <Table
        columns={columns}
        dataSource={getTasksByStatus(status)}
        rowKey="title"
        pagination={false}
        showHeader={false}
        onRow={(value) => {
          return {
            onClick: () => handleClick(value),
          };
        }}
      />
    ),
  }));

  return (
    <div className="table-view">
      <div className="table-view-container">
        <Button
          className="add-new-task"
          type="primary"
          onClick={handleAddNewTask}
          icon={<PlusOutlined style={{ width: '12px' }} />}
        >
          Add new task
        </Button>
        <div className="table-view-header">
          <Table
            columns={columns}
            showHeader={true}
            dataSource={[]}
            locale={{ emptyText: '' }}
          />
        </div>
        <Collapse items={collapseItems} />
      </div>
    </div>
  );
}
