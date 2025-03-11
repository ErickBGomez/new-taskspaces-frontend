import { useState } from 'react';
import {
  Button,
  Input,
  Form,
  Divider,
  Tabs,
  Typography,
  Upload,
  message,
} from 'antd';
import {
  LeftOutlined,
  UserOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from '@ant-design/icons';
import './SysAdminAction.scss';

const { Title } = Typography;

const SysAdminAction = () => {
  const [selectedAction, setSelectedAction] = useState('create');
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    if (disabled || loading) return;

    setDisabled(true);
    setLoading(true);

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

  const uploadProps = {
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error(`${file.name} is not a valid image file.`);
      }
      return isImage || Upload.LIST_IGNORE;
    },
  };

  const renderForm = () => {
    switch (selectedAction) {
      case 'create':
        return (
          <Form name="create-form" onFinish={onFinish} layout="vertical">
            <Form.Item
              label="Fullname"
              name="fullname"
              rules={[
                { required: true, message: 'Please input your fullname!' },
                { min: 3, message: 'Fullname must be at least 3 characters!' },
              ]}
            >
              <Input placeholder="Fullname" disabled={disabled || loading} />
            </Form.Item>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: 'Please input your username!' },
                { min: 3, message: 'Username must be at least 3 characters!' },
              ]}
            >
              <Input placeholder="Username" disabled={disabled || loading} />
            </Form.Item>
            <Form.Item
              label="Upload avatar"
              name="avatar"
              valuePropName="file"
              rules={[
                { required: true, message: 'Please upload your avatar!' },
              ]}
            >
              <Upload
                {...uploadProps}
                maxCount={1}
                accept="image/*"
                className="create-upload"
                disabled={disabled || loading}
              >
                {/* <Button
                  type="text"
                  icon={<UserOutlined />}
                  color="primary"
                  variant="outlined"
                  disabled={disabled || loading}
                >
                  Upload Avatar
                </Button> */}
              </Upload>
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email!' },
              ]}
            >
              <Input placeholder="Email" disabled={disabled || loading} />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
                { min: 8, message: 'Password must be at least 8 characters!' },
              ]}
            >
              <Input.Password
                placeholder="Password"
                iconRender={(visible) =>
                  visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                }
                disabled={disabled || loading}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                disabled={disabled || loading}
              >
                Create Account
              </Button>
            </Form.Item>
          </Form>
        );

      case 'update':
        return (
          <Form name="update-form" onFinish={onFinish}>
            {/* Email Label and Input */}
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email!' },
              ]}
              hasFeedback
              labelCol={{ span: 24 }}
            >
              <Input
                placeholder="Email"
                className="custom-input"
                disabled={disabled || loading}
              />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email!' },
              ]}
              hasFeedback
              labelCol={{ span: 24 }}
            >
              <Input
                placeholder="Email"
                className="custom-input"
                disabled={disabled || loading}
              />
            </Form.Item>

            {/* New information */}
            <Form.Item
              label="New Username"
              name="newusername"
              rules={[
                { required: true, message: 'Please input your username!' },
                { min: 3, message: 'Username must be at least 3 characters!' },
              ]}
              hasFeedback
              labelCol={{ span: 24 }}
            >
              <Input
                placeholder="Username"
                className="custom-input"
                disabled={disabled || loading}
              />
            </Form.Item>
            <Form.Item
              label="New Username"
              name="newusername"
              rules={[
                { required: true, message: 'Please input your username!' },
                { min: 3, message: 'Username must be at least 3 characters!' },
              ]}
              hasFeedback
              labelCol={{ span: 24 }}
            >
              <Input
                placeholder="Username"
                className="custom-input"
                disabled={disabled || loading}
              />
            </Form.Item>

            {/* Email Label and Input */}
            <Form.Item
              label="New Email"
              name="newemail"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email!' },
              ]}
              hasFeedback
              labelCol={{ span: 24 }}
            >
              <Input
                placeholder="Email"
                className="custom-input"
                disabled={disabled || loading}
              />
            </Form.Item>
            <Form.Item
              label="New Email"
              name="newemail"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email!' },
              ]}
              hasFeedback
              labelCol={{ span: 24 }}
            >
              <Input
                placeholder="Email"
                className="custom-input"
                disabled={disabled || loading}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                disabled={disabled || loading}
              >
                Update account
              </Button>
            </Form.Item>
          </Form>
        );

      case 'delete':
        return (
          <Form name="delete-form" onFinish={onFinish}>
            {/* Username Label and Input */}
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: 'Please input your username!' },
                { min: 3, message: 'Username must be at least 3 characters!' },
              ]}
              hasFeedback
              labelCol={{ span: 24 }}
            >
              <Input
                placeholder="Username"
                className="custom-input"
                disabled={disabled || loading}
              />
            </Form.Item>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: 'Please input your username!' },
                { min: 3, message: 'Username must be at least 3 characters!' },
              ]}
              hasFeedback
              labelCol={{ span: 24 }}
            >
              <Input
                placeholder="Username"
                className="custom-input"
                disabled={disabled || loading}
              />
            </Form.Item>

            <Divider>Or Email</Divider>
            {/* Email Label and Input */}
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email!' },
              ]}
              hasFeedback
              labelCol={{ span: 24 }}
            >
              <Input
                placeholder="Email"
                className="custom-input"
                disabled={disabled || loading}
              />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email!' },
              ]}
              hasFeedback
              labelCol={{ span: 24 }}
            >
              <Input
                placeholder="Email"
                className="custom-input"
                disabled={disabled || loading}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                disabled={disabled || loading}
              >
                Delete account
              </Button>
            </Form.Item>
          </Form>
        );

      case 'recoverAccount':
        return (
          <Form name="recover-account-form" onFinish={onFinish}>
            {/* Username Label and Input */}
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: 'Please input your username!' },
                { min: 3, message: 'Username must be at least 3 characters!' },
              ]}
              hasFeedback
              labelCol={{ span: 24 }}
            >
              <Input
                placeholder="Username"
                className="custom-input"
                disabled={disabled || loading}
              />
            </Form.Item>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: 'Please input your username!' },
                { min: 3, message: 'Username must be at least 3 characters!' },
              ]}
              hasFeedback
              labelCol={{ span: 24 }}
            >
              <Input
                placeholder="Username"
                className="custom-input"
                disabled={disabled || loading}
              />
            </Form.Item>

            <Divider>Or Email</Divider>
            {/* Email Label and Input */}
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email!' },
              ]}
              hasFeedback
              labelCol={{ span: 24 }}
            >
              <Input
                placeholder="Email"
                className="custom-input"
                disabled={disabled || loading}
              />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email!' },
              ]}
              hasFeedback
              labelCol={{ span: 24 }}
            >
              <Input
                placeholder="Email"
                className="custom-input"
                disabled={disabled || loading}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                disabled={disabled || loading}
              >
                Recover account
              </Button>
            </Form.Item>
          </Form>
        );

      case 'recoverPassword':
        return (
          <Form name="recover-password-form" onFinish={onFinish}>
            {/* Email Label and Input */}
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email!' },
              ]}
              hasFeedback
              labelCol={{ span: 24 }}
            >
              <Input
                placeholder="Email"
                className="custom-input"
                disabled={disabled || loading}
              />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email!' },
              ]}
              hasFeedback
              labelCol={{ span: 24 }}
            >
              <Input
                placeholder="Email"
                className="custom-input"
                disabled={disabled || loading}
              />
            </Form.Item>

            {/* New Password Label and Input */}
            <Form.Item
              label="New Password"
              name="newpassword"
              rules={[
                { required: true, message: 'Please input your password!' },
                { min: 8, message: 'Password must be at least 8 characters!' },
              ]}
              hasFeedback
              labelCol={{ span: 24 }}
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
            <Form.Item
              label="New Password"
              name="newpassword"
              rules={[
                { required: true, message: 'Please input your password!' },
                { min: 8, message: 'Password must be at least 8 characters!' },
              ]}
              hasFeedback
              labelCol={{ span: 24 }}
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

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                disabled={disabled || loading}
              >
                Recover Password
              </Button>
            </Form.Item>
          </Form>
        );

      default:
        return null;
    }
  };

  return (
    <div className="sysAdminAction-container">
      <div className="sysAdminAction-card">
        <div className="top">
          <LeftOutlined className="left-icon" />
          <div className="center">
            <Title level={3} color="colorText">
              TaskSpaces System
            </Title>
            <Title className="title">Account</Title>
          </div>
        </div>

        <Tabs
          defaultActiveKey="create"
          onChange={(key) => setSelectedAction(key)}
          items={[
            { label: 'Create Account', key: 'create' },
            { label: 'Update Account', key: 'update' },
            { label: 'Delete Account', key: 'delete' },
            { label: 'Recover Account', key: 'recoverAccount' },
            { label: 'Recover Password', key: 'recoverPassword' },
          ]}
        />

        {renderForm()}
      </div>
    </div>
  );
};
export default SysAdminAction;
