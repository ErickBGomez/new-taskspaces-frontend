import { Button, Divider, message, Spin, Tabs, Typography, App } from 'antd';
import { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  CalendarOutlined,
  LayoutOutlined,
  MoreOutlined,
  UnorderedListOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import ColumnView from '../ProjectViews/ColumnView/ColumnView';
import TableView from '../ProjectViews/TableView/TableView';
import CalendarView from '../ProjectViews/CalendarView/CalendarView';
import './ProjectHeader.scss';
import { AuthContext } from '../../context/auth/AuthContext';
import { TaskContext } from '../../context/task/TaskContext';
import useFetchData from '../../hooks/useFetchData';
import { useTasks } from '../../hooks/socketio/useTask';

const { Title } = Typography;

export default function ProjectHeader({ project }) {
  const [activeTab, setActiveTab] = useState('1');
  const { workspaceId, projectId } = useParams();
  const { token } = useContext(AuthContext);
  const { saveTasks } = useContext(TaskContext);
  const { data, loading, error } = useFetchData(`tasks/p/${projectId}`, token);
  const { message } = App.useApp();
  const navigate = useNavigate();

  // SocketIO
  const { tasks, fetchTasks } = useTasks(projectId, token);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks, saveTasks]);

  const tabItems = [
    {
      key: '1',
      label: (
        <span>
          <LayoutOutlined style={{ marginRight: 8 }} />
          Board
        </span>
      ),
    },
    {
      key: '2',
      label: (
        <span>
          <UnorderedListOutlined style={{ marginRight: 8 }} />
          List
        </span>
      ),
    },
    {
      key: '3',
      label: (
        <span>
          <CalendarOutlined style={{ marginRight: 8 }} />
          Calendar
        </span>
      ),
    },
  ];

  const renderView = () => {
    switch (activeTab) {
      case '1':
        return <ColumnView statuses={project.statuses} />;
      case '2':
        return <TableView />;
      case '3':
        return <CalendarView />;
      default:
        return null;
    }
  };

  if (loading) return <Spin />;

  if (error) return message.error("Couldn't load tasks. Please try again.");

  if (data) {
    return (
      <>
        <div className="project-header">
          <div className="project-header-left">
            <div className="project-header-title">
              <div className="project-header-icon">{project.icon}</div>
              <div className="project-header-name">
                <Title level={4}>{project.title}</Title>
              </div>
            </div>
            <Divider
              type="vertical"
              style={{
                height: '32px',
                borderWidth: '2px',
              }}
            />
            <div className="project-header-views">
              <Tabs
                defaultActiveKey="1"
                onChange={(key) => setActiveTab(key)}
                items={tabItems}
              />
            </div>
          </div>
          <div className="project-header-right">
            <div className="settings-button">
              <Button
                icon={<MoreOutlined />}
                type="text"
                onClick={() =>
                  navigate(`/w/${workspaceId}/p/${projectId}/project-dialog`)
                }
              />
            </div>
          </div>
        </div>
        <div className="project-content">{renderView()}</div>
      </>
    );
  }

  return null;
}
