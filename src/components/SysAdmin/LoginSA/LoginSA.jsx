import { useState } from 'react';
import { Button, Input, Form, Typography } from 'antd';
import {
  LeftOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from '@ant-design/icons';
import './LoginSA.scss';

const { Title } = Typography;

const LoginSA = () => {
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    if (disabled || loading) return;

    setDisabled(true);
    setLoading(true);
    console.log('Success:', values);

    try {
      console.log('Success:', values);
      // Lógica de autenticación o enviar los datos a un API.
    } catch (e) {
      console.error('Error:', e);
    } finally {
      setLoading(false);
      setDisabled(false);
    }
  };

  return (
    <div className="LoginSA-container">
      <div className="LoginSA-card">
        <div className="top">
          <LeftOutlined className="left-icon" />
          <div className="center">
            <Title level={3} color="colorText">
              TaskSpaces System
            </Title>
            <Title className="title">SysAdmin Panel</Title>
          </div>
        </div>

        <Form name="LoginSA-form" onFinish={onFinish} layout="vertical">
          {/* Email Label and Input */}
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}
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
            rules={[
              { required: true, message: 'Please input your password!' },
              { min: 8, message: 'Password must be at least 8 characters!' },
            ]}
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

          {/* Log In Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              disabled={disabled || loading}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginSA;
