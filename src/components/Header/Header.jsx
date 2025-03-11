import { Button, Avatar, Dropdown, Menu, Skeleton, Spin } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/auth/AuthContext';
import { SidebarContext } from '../../context/sidebar/SidebarContext';
import {
  DownOutlined,
  LogoutOutlined,
  MenuOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import './Header.scss';
import BrandLogo from '../BrandLogo/BrandLogo';
import { Link } from 'react-router-dom';
import useFetchData from '../../hooks/useFetchData';
import Profile from '../Profile/Profile';

const Header = () => {
  const [workspaces, setWorkspaces] = useState([]);
  const { token, user, logout } = useContext(AuthContext);
  const { toggleSidebarState } = useContext(SidebarContext);
  const { workspaceId } = useParams();
  const { data, loading, error } = useFetchData(`workspaces`, token);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleWorkspaceSelect = (workspaceId) => {
    navigate(`/w/${workspaceId}`);
  };

  const handleMenuClick = ({ key }) => {
    if (key === 'logout') return handleLogout();
    navigate(`/${key}`);
  };

  const dropdownItems = [
    // {
    //   key: 'profile',
    //   label: 'Profile',
    //   icon: <UserOutlined />,
    // },
    // {
    //   type: 'divider',
    // },
    // {
    //   key: 'settings',
    //   label: 'Settings',
    //   icon: <SettingOutlined />,
    // },
    // {
    //   key: 'help',
    //   label: 'Help',
    //   icon: <QuestionCircleOutlined />,
    // },
    // {
    //   type: 'divider',
    // },
    {
      key: 'logout',
      label: 'Logout',
      icon: <LogoutOutlined />,
    },
  ];

  useEffect(() => {
    if (data) {
      setWorkspaces(data.content);
      console.log('Fetched data:', data.content);
    }
  }, [data]);

  if (loading) {
    return <Spin />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <header className="header-container">
        {/* Left Header */}
        <div className="header-left">
          <Link to={{ pathname: '/' }}>
            <BrandLogo />
          </Link>
          <nav className="header-nav">
            <Link to={{ pathname: '/' }}>Home</Link>
            <Dropdown
              trigger={['click']}
              menu={{
                items: [
                  ...(loading
                    ? [
                        {
                          key: 'loading',
                          label: <Skeleton active />,
                        },
                      ]
                    : workspaces && workspaces.length > 0
                      ? workspaces.map((workspace) => ({
                          key: workspace._id,
                          label: workspace.title,
                          onClick: () => handleWorkspaceSelect(workspace._id),
                        }))
                      : [
                          {
                            key: 'no-workspaces',
                            label: 'No Workspaces Available',
                          },
                        ]),
                  // Agregar el botón de "Add Workspace"
                  {
                    type: 'divider',
                  },
                  {
                    key: 'add-workspace',
                    label: (
                      <Button
                        type="primary"
                        style={{ width: '100%' }}
                        onClick={() => navigate('/w-create')}
                      >
                        Add Workspace
                      </Button>
                    ),
                  },
                ],
              }}
            >
              <Button className="workspace-dropdown" type="link">
                Workspaces <DownOutlined />
              </Button>
            </Dropdown>
          </nav>
        </div>

        {/* Right Header */}
        <div className="header-right">
          {/* Mostrar botones de login/registro o avatar de usuario basado en el estado del token */}
          {token ? (
            <>
              <Dropdown
                menu={{ items: dropdownItems, onClick: handleMenuClick }}
                trigger={['click']}
              >
                <div className="profile-dropdown">
                  <Profile user={user} className="user-avatar" />
                  <DownOutlined />
                </div>
              </Dropdown>
            </>
          ) : (
            <div className="header-buttons">
              {/* No Authentic User */}
              <Link to={{ pathname: '/login' }}>
                <Button type="default" className="login-button">
                  Log in
                </Button>
              </Link>
              <Link to={{ pathname: '/register' }}>
                <Button type="primary" className="register-button">
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
