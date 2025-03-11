import { useState } from 'react';
import { Button, Input, Form, Upload, Typography, App } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import usePostData from '../../hooks/usePostData';
import {
  fullnameRules,
  usernameRules,
  emailRules,
  passwordRules,
  confirmPasswordRules,
} from '../../helpers/forms/userRegisterValidation';
import './Register.scss';

const { Title, Paragraph } = Typography;

const Register = () => {
  const [form] = Form.useForm();
  const { postData, loading, error } = usePostData('users/register');
  const { message } = App.useApp();
  const navigate = useNavigate();

  const [disabled, setDisabled] = useState(false);

  const onFinish = async (values) => {
    if (disabled || loading) return;

    setDisabled(true);

    try {
      await postData(values);
      console.log(error);

      message.success('Account created successfully');
      navigate('/login');
    } catch (e) {
      if (e.error) {
        const backendErrors = e.error.map((be) => ({
          name: be.field,
          errors: be.errors,
        }));

        // Set custom validation to form items
        form.setFields(backendErrors);
      } else {
        // Server-side validation error notification
        message.error('An error occurred while creating your account');
      }
    } finally {
      setDisabled(false);
    }
  };

  // Client-side validation error notification
  const onFinishFailed = () => {
    message.error('Please check the form and try again');
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <Title className="title">Sign up</Title>
        <Form
          form={form}
          name="register-form"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          {/* Fullname Label and Input */}
          <Form.Item
            label="Fullname"
            name="fullname"
            rules={fullnameRules}
            hasFeedback
          >
            <Input placeholder="Fullname" disabled={disabled || loading} />
          </Form.Item>

          {/* Username Label and Input */}
          <Form.Item
            label="Username"
            name="username"
            rules={usernameRules}
            hasFeedback
          >
            <Input placeholder="Username" disabled={disabled || loading} />
          </Form.Item>

          {/* avatar Label and Input */}
          {/* <Form.Item label="Avatar" name="avatar">
            <Upload maxCount={1} beforeUpload={() => false}>
              <Button type="default" className="upload-avatar">
                Upload file
              </Button>
            </Upload>
          </Form.Item> */}

          {/* Email Label and Input */}
          <Form.Item label="Email" name="email" rules={emailRules} hasFeedback>
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
            hasFeedback
          >
            <Input.Password
              placeholder="********"
              disabled={disabled || loading}
              iconRender={(visible) =>
                visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          {/* Repeat Password Label and Input */}
          <Form.Item
            label="Confirm your Password"
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              ...confirmPasswordRules,
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match!'));
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password
              placeholder="********"
              disabled={disabled || loading}
              iconRender={(visible) =>
                visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          {/* Create Account Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              disabled={disabled || loading}
              loading={loading}
            >
              Create account
            </Button>
          </Form.Item>
        </Form>

        {/* Login Link */}
        <Paragraph className="login-link">
          Already have an account?{' '}
          <Link to={{ pathname: '/login' }}>Log in here</Link>
        </Paragraph>
      </div>
    </div>
  );
};

export default Register;
