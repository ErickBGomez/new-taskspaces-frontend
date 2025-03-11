import { useContext, useState } from 'react';
import { AuthContext } from '../../context/auth/AuthContext';
import { Button, Checkbox, Input, Form, Divider, Typography, App } from 'antd';
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  GoogleOutlined,
} from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import usePostData from '../../hooks/usePostData';
import {
  emailRules,
  passwordRules,
} from '../../helpers/forms/userLoginValidation';
import './Login.scss';

const { Title, Paragraph } = Typography;

const Login = () => {
  const { login } = useContext(AuthContext);
  const { message } = App.useApp();
  const { postData, loading, error } = usePostData('users/login');
  const navigate = useNavigate();

  const [disabled, setDisabled] = useState(false);

  const onFinish = async (values) => {
    if (disabled || loading) return;

    setDisabled(true);

    try {
      const response = await postData(values);
      const { user, token } = response.content;

      login(user, token, values.remember);

      if (!error) {
        message.success('Logged in successfully');

        // Redirect
        navigate('/w');
      }
    } catch (e) {
      message.error('Invalid credentials. Please check the form and try again');
    } finally {
      setDisabled(false);
    }
  };

  const onFinishFailed = () => {
    message.error('Please check the form and try again');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <Title className="title">Log in</Title>
        <Form
          name="login-form"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={{ remember: false }}
        >
          {/* Email Label and Input */}
          <Form.Item
            label="Email"
            name="email"
            rules={emailRules}
            labelCol={{ span: 24 }}
            hasFeedback
          >
            <Input
              placeholder="Email"
              className="custom-input"
              disabled={disabled || loading}
            />
          </Form.Item>

          {/* Password Label and Input */}
          <Form.Item
            label="Password"
            name="password"
            rules={passwordRules}
            labelCol={{ span: 24 }}
            hasFeedback
          >
            <Input.Password
              placeholder="********"
              className="custom-input"
              iconRender={(visible) =>
                visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
              }
              disabled={disabled || loading}
            />
          </Form.Item>

          {/* Remember Me Checkbox */}
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox disabled={disabled}>Remember me</Checkbox>
          </Form.Item>

          {/* Forgot Password Link */}
          <Link
            className="forgot-password"
            to={{ pathname: '/forgot-password' }}
          >
            Forgot password?
          </Link>

          {/* Log In Button */}
          <Form.Item className="submit">
            <Button
              type="primary"
              htmlType="submit"
              block
              disabled={disabled || loading}
              loading={loading}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>

        {/* Signup Link */}
        <Paragraph className="signup-link">
          Don&apos;t have an account?{' '}
          <Link to={{ pathname: '/register' }}>Create a new account</Link>
        </Paragraph>
      </div>
    </div>
  );
};

export default Login;
