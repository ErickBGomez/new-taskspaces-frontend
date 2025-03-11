import { Upload, Form, Input, Select, Button, Image } from 'antd';
import { users } from '../../../helpers/fakeDBUsers';
import { EditOutlined, UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';
import './UserSettings.scss';
import Paragraph from 'antd/es/typography/Paragraph';
import Title from 'antd/es/typography/Title';
import {
  descriptionRules,
  emailRules,
  fullnameRules,
  passwordRules,
  usernameRules,
} from '../../../helpers/forms/userSettingsDialogValidation';

export default function UserSettings() {
  const user = users[0];

  const [fullname, setFullname] = useState(user.fullname);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [description, setDescription] = useState(user.description);
  const [isEditing, setIsEditing] = useState({
    fullname: false,
    username: false,
    email: false,
    password: false,
    description: false,
  });

  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEditClick = (field) => {
    setIsEditing((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSave = async () => {
    if (disabled || loading) return;

    setDisabled(true);
    setLoading(true);

    try {
      user.fullname = fullname;
      user.username = username;
      user.email = email;
      user.password = password;
      user.description = description;

      setIsEditing({
        fullname: false,
        username: false,
        email: false,
        password: false,
        description: false,
      });

      message.success('User settings saved successfully!');
    } catch (error) {
      message.error('Error saving user settings');
    } finally {
      setLoading(false);
      setDisabled(false);
    }
  };

  const handleCancel = () => {
    setFullname(user.fullname);
    setUsername(user.username);
    setEmail(user.email);
    setPassword(user.password);
    setDescription(user.description);

    setIsEditing({
      fullname: false,
      username: false,
      email: false,
      password: false,
      description: false,
    });
  };

  return (
    <>
      <div className="user-settings">
        <div className="user-settings-container">
          <div className="user-settings-title">
            <span className="user-settings-title-general">
              <Paragraph>Settings</Paragraph>
            </span>
            <span className="user-settings-title-type">
              <Title level={1}>User</Title>
            </span>
          </div>
          <div className="user-settings-profile-picture">
            <Image src={user.picture} alt="Profile picture" preview={false} />
            <Upload>
              <Button
                className="upload-button"
                color="primary"
                variant="outlined"
                icon={<UploadOutlined />}
                disabled={disabled || loading}
              >
                Upload image
              </Button>
            </Upload>
          </div>
          <div className="user-settings-form">
            <Form>
              <div className="settings-input">
                <Form.Item
                  label="Full name:"
                  name="fullname"
                  rules={fullnameRules}
                ></Form.Item>
                <div className="input-group">
                  <Input
                    type="text"
                    value={fullname}
                    disabled={!isEditing.fullname || disabled || loading}
                    onChange={(e) => setFullname(e.target.value)}
                  />
                  <Button
                    type="text"
                    icon={<EditOutlined />}
                    onClick={() => handleEditClick('fullname')}
                    disabled={disabled || loading}
                  />
                </div>
              </div>
              <div className="settings-input">
                <Form.Item
                  label="Username:"
                  name="username"
                  rules={usernameRules}
                ></Form.Item>
                <div className="input-group">
                  <Input
                    type="text"
                    value={username || disabled || loading}
                    disabled={!isEditing.username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <Button
                    type="text"
                    icon={<EditOutlined />}
                    onClick={() => handleEditClick('username')}
                    disabled={disabled || loading}
                  />
                </div>
              </div>
              <div className="settings-input">
                <Form.Item
                  label="Email:"
                  name="email"
                  rules={emailRules}
                ></Form.Item>
                <div className="input-group">
                  <Input
                    type="email"
                    value={email}
                    disabled={!isEditing.email || disabled || loading}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Button
                    type="text"
                    icon={<EditOutlined />}
                    onClick={() => handleEditClick('email')}
                    disabled={disabled || loading}
                  />
                </div>
              </div>
              <div className="settings-input">
                <Form.Item
                  label="Password:"
                  name="password"
                  rules={passwordRules}
                ></Form.Item>
                <div className="input-group">
                  <Input
                    type="password"
                    value={password}
                    disabled={!isEditing.password || disabled || loading}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button
                    type="text"
                    icon={<EditOutlined />}
                    onClick={() => handleEditClick('password')}
                    disabled={disabled || loading}
                  />
                </div>
              </div>
              <div className="settings-input">
                <Form.Item
                  label="Description:"
                  name="description"
                  rules={descriptionRules}
                ></Form.Item>
                <div className="input-group">
                  <Input
                    type="text"
                    value={description}
                    disabled={!isEditing.description || disabled || loading}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <Button
                    type="text"
                    icon={<EditOutlined />}
                    onClick={() => handleEditClick('description')}
                    disabled={disabled || loading}
                  />
                </div>
              </div>
              <div className="form-buttons">
                <div className="save-button">
                  <Button
                    type="primary"
                    onClick={handleSave}
                    disabled={disabled || loading}
                  >
                    Save
                  </Button>
                </div>
                <div className="cancel-button">
                  <Button
                    onClick={handleCancel}
                    color="primary"
                    variant="outlined"
                    disabled={disabled || loading}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
