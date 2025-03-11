import { useContext } from 'react';
import { AuthContext } from '../../context/auth/AuthContext';
import { SidebarContext } from '../../context/sidebar/SidebarContext';
import useFetchData from '../../hooks/useFetchData';
import { Button, Divider, Typography, Menu, Spin } from 'antd';
import {
  HomeOutlined,
  StarOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
  DesktopOutlined,
} from '@ant-design/icons';
import './Sidebar.scss';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

const Sidebar = () => {
  const { token } = useContext(AuthContext);
  const { sidebarState } = useContext(SidebarContext);
  const { data, loading, error } = useFetchData('workspaces', token);
  const navigate = useNavigate();

  const sidebarStateString = sidebarState ? 'active' : '';

  let favorites = [];
  let workspaces = data?.content
    ? data.content.map((workspace) => ({
        key: `workspace-${workspace._id}`,
        label: workspace.title,
        icon: <DesktopOutlined />,
      }))
    : [];

  const menuItems = [
    {
      key: 'home',
      label: 'Home',
      icon: <HomeOutlined />,
    },
    {
      key: 'favorites',
      label: 'Favorites',
      icon: <StarOutlined />,
      children: [
        ...favorites,
        {
          key: 'add-favorite',
          label: 'Add Favorite',
          icon: <PlusOutlined />,
        },
      ],
    },
    {
      key: 'workspaces',
      label: 'Workspaces',
      icon: <DesktopOutlined />,
      children: [
        ...workspaces,
        {
          key: 'add-workspace',
          label: 'Add Workspace',
          icon: <PlusOutlined />,
        },
      ],
    },
  ];

  const handleMenuClick = (item) => {
    if (item.key.includes('workspace-')) {
      const workspaceItemId = item.key.split('-')[1];
      navigate(`/w/${workspaceItemId}`);
    }

    if (item.key === 'add-workspace') {
      navigate('/w-create');
    }
  };

  if (data)
    return (
      <div className={`sidebar ${sidebarStateString}`}>
        <div className="sidebar-top">
          {/* Top sidebar */}
          <Text className="letter">Name workspace</Text>
        </div>

        <Divider />

        <Menu
          className="menu"
          items={menuItems}
          mode="inline"
          defaultSelectedKeys={['home']}
          defaultOpenKeys={['favorites', 'workspaces']}
          onClick={handleMenuClick}
        />

        <div className="buttons">
          <Button
            type="default"
            color="primary"
            variant="outlined"
            icon={<QuestionCircleOutlined />}
            block
            className="button"
          >
            Help
          </Button>
        </div>
      </div>
    );
};

export default Sidebar;
