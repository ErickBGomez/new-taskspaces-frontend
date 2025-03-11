import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, Form, Typography, App } from 'antd';
import usePostData from '../../../hooks/usePostData';
import './ForgotPasswordSend.scss';
import { emailRules } from '../../../helpers/forms/userRegisterValidation';

const { Title, Paragraph } = Typography;

export default function ForgotPasswordSend() {
  const [disabled, setDisabled] = useState(false);
  const { message } = App.useApp();
  const { postData, loading } = usePostData('auth/forgot-password');

  const handleSubmit = async (values) => {
    setDisabled(true);
    try {
      await postData({ email: values.email });
      message.success('Password reset email sent. Please check your inbox.');
    } catch (error) {
      message.error(error?.message || 'Error sending password reset email.');
    } finally {
      setDisabled(false);
    }
  };

  return (
    <>
      <div className="forgot-password-send">
        <div className="forgot-password-send-container">
          <div className="forgot-password-send-title">
            <Title level={1}>Forgot password</Title>
          </div>
          <div className="forgot-password-send-form">
            <Paragraph>
              Please enter your email address to receive a password reset link.
            </Paragraph>
            <div className="forgot-password-send-email-form">
              <Form onFinish={handleSubmit} layout="vertical">
                <Form.Item
                  label="Email"
                  name="email"
                  rules={emailRules}
                  hasFeedback
                >
                  <Input placeholder="Email" disabled={disabled || loading} />
                </Form.Item>

                <Form.Item>
                  <div className="forgot-password-send-return-link">
                    <Link to={{ pathname: '/login' }}>Return to login</Link>
                  </div>
                  <div className="forgot-password-send-email-button">
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={loading}
                      disabled={disabled || loading}
                    >
                      Send
                    </Button>
                  </div>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
