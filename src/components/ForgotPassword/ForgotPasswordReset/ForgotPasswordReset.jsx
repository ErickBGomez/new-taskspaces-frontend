import { useState } from 'react';
import { Button, Input, Form, message } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import './ForgotPasswordReset.scss';
import Title from 'antd/es/typography/Title';
import { useSearchParams, useNavigate } from 'react-router-dom';
import usePostData from '../../../hooks/usePostData';
import {
  passwordRules,
  confirmPasswordRules,
} from '../../../helpers/forms/userRegisterValidation';

export default function ForgotPasswordReset() {
  const [disabled, setDisabled] = useState(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  const { postData, loading } = usePostData('auth/reset-password');

  const handleResetPassword = async (values) => {
    if (!token) {
      return message.error('Invalid or missing reset token.');
    }

    try {
      setDisabled(true);

      await postData({ token, password: values.password });
      message.success('Password reset successfully!');
      navigate('/login');
    } catch (error) {
      console.error('API Error:', error);
      if (error.message === 'Invalid or expired token') {
        message.error('The reset token has expired. Please request a new one.');
        navigate('/forgot-password');
      } else {
        message.error(error.message || 'Error resetting password.');
      }
    } finally {
      setDisabled(false);
    }
  };

  if (!token) {
    return (
      <div className="forgot-password-reset">
        <Title level={2}>Invalid token</Title>
        <p>The reset token is missing or invalid. Please request a new one.</p>
      </div>
    );
  }

  return (
    <>
      <div className="forgot-password-reset">
        <div className="forgot-password-reset-container">
          <div className="forgot-password-reset-title">
            <Title level={1}>Reset Password</Title>
          </div>
          <div className="forgot-password-reset-form">
            <Form layout="vertical" onFinish={handleResetPassword}>
              <Form.Item
                name="password"
                label="Password"
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
                      return Promise.reject(
                        new Error('Passwords do not match!')
                      );
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
              <div className="forgot-password-reset-button">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  disabled={disabled || loading}
                >
                  Reset password
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
