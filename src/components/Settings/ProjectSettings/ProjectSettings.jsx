import { Form, Input, Select, Button, App } from 'antd';
import { projects } from '../../../helpers/fakeDBWorkspace';
import { EditOutlined, GoogleOutlined } from '@ant-design/icons';
import { useState, useEffect, useContext } from 'react';
import './ProjectSettings.scss';
import Paragraph from 'antd/es/typography/Paragraph';
import Title from 'antd/es/typography/Title';
import { projectNameRules } from '../../../helpers/forms/userSettingsDialogValidation';
import useFetchData from '../../../hooks/useFetchData';
import usePutData from '../../../hooks/usePutData';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../context/auth/AuthContext';

export default function ProjectSettings() {
  const { token } = useContext(AuthContext);
  const { projectId, workspaceId } = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const {
    data,
    loading: fetchLoading,
    error,
  } = useFetchData(`projects/${projectId}/w/${workspaceId}`, token);
  const {
    putData,
    loading: updating,
    error: updateError,
  } = usePutData(`projects/${projectId}/w/${workspaceId}`, token);
  const { message } = App.useApp();

  const [isEditing, setIsEditing] = useState({ projectName: false });

  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const handleEditClick = (field) => {
    setIsEditing({ ...isEditing, [field]: true });
  };

  const handleSave = () => {
    form.submit();
  };

  const handleUpdateProject = async (values) => {
    const { title, icon } = values;

    console.log(values);

    if (!title.trim()) {
      return message.error('Project name cannot be empty.');
    }

    try {
      await putData({ title, icon });
      setIsEditing({ projectName: false });

      if (!error) message.success('Project updated successfully.');
    } catch (error) {
      message.error('Failed to update project');
    }
  };

  const handleCancel = () => {
    if (data) {
      // setProjectName(data.title);
      // setSelectedIcon(data.icon);
    }
    setIsEditing({ projectName: false });
    navigate(-1);
  };

  if (fetchLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading project data: {error.message}</p>;
  if (!data) return null;

  return (
    <>
      <div className="project-settings">
        <div className="project-settings-container">
          <div className="project-settings-title">
            <span className="project-settings-title-general">
              <Paragraph>Settings</Paragraph>
            </span>
            <span className="project-settings-title-type">
              <Title level={1}>Project</Title>
            </span>
          </div>
          <div className="project-settings-form">
            <Form
              form={form}
              initialValues={{
                title: data.content.title,
                icon: data.content.icon,
              }}
              onFinish={handleUpdateProject}
            >
              <div className="settings-input">
                <div className="input-group">
                  <Form.Item
                    label="Project name:"
                    name="title"
                    rules={projectNameRules}
                  >
                    <Input disabled={!isEditing.projectName} />
                  </Form.Item>
                  <Button
                    className="edit-button"
                    type="text"
                    icon={<EditOutlined />}
                    onClick={() => handleEditClick('projectName')}
                    disabled={disabled || loading}
                  />
                </div>
              </div>
              <div className="settings-input">
                <div className="input-group">
                  <Form.Item
                    label="Icon:"
                    name="icon"
                    rules={[
                      { required: true, message: 'Icon cannot be empty' },
                    ]}
                  >
                    <Select placeholder="Select an icon">
                      <Select.Option value="🚀">🚀</Select.Option>
                      <Select.Option value="🔧">🔧</Select.Option>
                      <Select.Option value="📚">📚</Select.Option>
                    </Select>
                  </Form.Item>
                </div>
              </div>
              <div className="form-buttons">
                <div className="save-button">
                  <Button
                    type="primary"
                    onClick={handleSave}
                    loading={updating}
                  >
                    Save
                  </Button>
                </div>
                <div className="cancel-button">
                  <Button
                    onClick={handleCancel}
                    variant="outlined"
                    color="primary"
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
