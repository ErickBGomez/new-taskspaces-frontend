import { Avatar, Typography } from 'antd';
import { LeftOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './PanelSA.scss';
import Profile from '../../Profile/Profile';

const { Title, Paragraph } = Typography;

const PanelSA = () => {
  const navigate = useNavigate(); // Hook de navegación

  const handleOptionClick = (option) => {
    // Navegar dependiendo de la opción seleccionada
    switch (option) {
      case 'Accounts':
        navigate('/accounts');
        break;
      case 'Workspaces':
        navigate('/workspaces');
        break;
      case 'Projects':
        navigate('/projects');
        break;
      case 'Tags':
        navigate('/tags');
        break;
      case 'Reports':
        navigate('/reports');
        break;
      default:
        break;
    }
  };
  return (
    <div className="panelSA-container">
      <div className="panelSA-card">
        <div className="top">
          <LeftOutlined className="left-icon" />
          <div className="center">
            <Title level={3} color="colorText">
              TaskSpaces System
            </Title>
            <Title className="title">SysAdmin PanelSA</Title>
          </div>
        </div>

        <Paragraph>Click an option to manage</Paragraph>

        <div className="panelSA-options">
          {[
            'Accounts',
            'Workspaces',
            'Projects',
            'Tasks',
            'Tags',
            'Reports',
          ].map((option, index) => (
            <div
              key={index}
              className="panelSA-option-item"
              onClick={() => handleOptionClick(option)}
            >
              <Avatar shape="square" icon={<UserOutlined />} />
              <Paragraph>{option}</Paragraph>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PanelSA;
