import { Input, Button, Form, Image } from 'antd';
import { collaborators } from '../../../helpers/fakeDBWorkspace';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import './WorkspaceSettings.scss';
import Paragraph from 'antd/es/typography/Paragraph';
import Title from 'antd/es/typography/Title';
import {
  descriptionRules,
  workspaceNameRules,
} from '../../../helpers/forms/userSettingsDialogValidation';

const { TextArea } = Input;

export default function WorkspaceSettings() {
  const owner = collaborators.find((member) => member.type === 'owner');
  const members = collaborators.filter(
    (member) => member.type === 'collaborator'
  );

  const [workspaceName, setWorkspaceName] = useState('My Workspace');
  const [description, setDescription] = useState(
    'This is a sample workspace description.'
  );
  const [isEditing, setIsEditing] = useState({
    workspaceName: false,
    description: false,
  });

  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEditClick = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: true }));
  };

  const handleSave = async () => {
    if (disabled || loading) return;

    setDisabled(true);
    setLoading(true);

    try {
      // Lógica para guardar los datos del workspace
      console.log('Saved Workspace:', { workspaceName, description });
      message.success('Workspace saved successfully!');
    } catch (error) {
      message.error('Error saving workspace');
    } finally {
      setDisabled(false);
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setWorkspaceName('My Workspace');
    setDescription('This is a sample workspace description.');
    setIsEditing({
      workspaceName: false,
      description: false,
    });
  };

  return (
    <>
      <div className="workspace-settings">
        <div className="workspace-settings-container">
          <div className="workspace-settings-title">
            <span className="workspace-settings-title-general">
              <Paragraph>Settings</Paragraph>
            </span>
            <span className="workspace-settings-title-type">
              <Title level={1}>Workspace</Title>
            </span>
          </div>
          <div className="workspace-settings-form">
            <div className="settings-input">
              <Form.Item
                label="Workspace name:"
                name="workspacename"
                rules={workspaceNameRules}
              ></Form.Item>
              <div className="input-group">
                <Input
                  value={workspaceName}
                  disabled={!isEditing.workspaceName || disabled || loading}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                />
                <Button
                  className="edit-button"
                  type="text"
                  icon={<EditOutlined />}
                  onClick={() => handleEditClick('workspaceName')}
                  disabled={disabled || loading}
                />
              </div>
            </div>
            <div className="settings-input">
              <Form.Item label="Members:" name="members"></Form.Item>
              <div className="collaborator-list">
                {members.map((member) => (
                  <div key={member.username} className="collaborators">
                    <Image
                      preview={false}
                      src={member.picture}
                      alt={member.fullname}
                      className="collaborator-profile-picture"
                    />
                  </div>
                ))}
                <div className="add-collaborator">
                  <PlusOutlined />
                </div>
              </div>
            </div>
            <div className="settings-input">
              <Form.Item
                label="Description:"
                name="description"
                rules={descriptionRules}
              ></Form.Item>
              <div className="input-group">
                <TextArea
                  value={description}
                  disabled={!isEditing.description || disabled || loading}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <Button
                  className="edit-button"
                  type="text"
                  icon={<EditOutlined />}
                  onClick={() => handleEditClick('description')}
                  disabled={disabled || loading}
                />
              </div>
            </div>
            <div className="settings-input">
              <Form.Item label="Owner:" name="owner"></Form.Item>
              <div className="owner-info">
                <Image
                  src={owner.picture}
                  alt={owner.username}
                  className="owner-profile-picture"
                />
                <span>{owner.username}</span>
              </div>
            </div>
            <div className="form-buttons">
              <div className="save-button">
                <Button
                  type="primary"
                  onClick={handleSave}
                  loading={loading}
                  disabled={disabled || loading}
                >
                  Save
                </Button>
              </div>
              <div className="cancel-button">
                <Button
                  color="primary"
                  variant="outlined"
                  onClick={handleCancel}
                  disabled={disabled || loading}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
