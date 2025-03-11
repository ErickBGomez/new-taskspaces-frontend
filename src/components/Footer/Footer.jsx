import { Link } from 'react-router-dom';
import BrandLogoWhite from '../BrandLogoWhite/BrandLogoWhite';
import { Space, Typography } from 'antd';
import {
  InstagramOutlined,
  GithubOutlined,
  LinkedinOutlined,
} from '@ant-design/icons';
import './Footer.scss';

const { Paragraph } = Typography;

export default function Footer() {
  return (
    <>
      <div className="footer">
        <div className="footer-main">
          <div className="footer-company">
            <BrandLogoWhite />
          </div>
          <div className="footer-nav">
            <Space>
              <Link to={{ pathname: '/' }}>
                <Paragraph>Home</Paragraph>
              </Link>
              <Link to={{ pathname: '/w' }}>
                <Paragraph>Workspaces</Paragraph>
              </Link>
              <Link to={{ pathname: '/' }}>
                <Paragraph>Tasks</Paragraph>
              </Link>
              <Link to={{ pathname: '/' }}>
                <Paragraph>Contact Us</Paragraph>
              </Link>
              <Link to={{ pathname: '/' }}>
                <Paragraph>Help</Paragraph>
              </Link>
            </Space>
          </div>
          <div className="footer-icons">
            <InstagramOutlined />
            <GithubOutlined />
            <LinkedinOutlined />
          </div>
        </div>
        <div className="footer-legal-links">
          <Space>
            <Link>Copyright @2024</Link>
            <Link>Terms and Conditions</Link>
            <Link>Privacy Policy</Link>
          </Space>
        </div>
      </div>
    </>
  );
}
