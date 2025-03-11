import { useContext, useState } from 'react';
import { Typography, Form, Input, Button, App } from 'antd';
import { titleRules } from '../../../helpers/forms/workspaceCreateValidation';
import usePostData from '../../../hooks/usePostData';
import useFetchData from '../../../hooks/useFetchData';
import { AuthContext } from '../../../context/auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import './WorkspaceCreate.scss';

const { Title, Paragraph } = Typography;

const WorkspaceCreate = () => {
  const { token } = useContext(AuthContext);
  const { postData, loading, error } = usePostData('workspaces', token);
  const { data } = useFetchData('workspaces', token);
  const { message } = App.useApp();
  const navigate = useNavigate();

  const [disabled, setDisabled] = useState(false);

  const onFinish = async (values) => {
    if (disabled || loading) return;

    setDisabled(true);

    try {
      await postData(values);

      if (!error) {
        message.success('Workspace created successfully');

        navigate('/w');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setDisabled(false);
    }
  };

  return (
    <div className="workspace-create">
      <div className="workspace-create-container">
        <div className="workspace-create-title">
          {data && data.content.length === 0 && (
            <>
              <Title>Let&apos;s create our first workspace!</Title>
              <Paragraph>
                You don&apos;t have any workspaces yet. Let&apos;s create one to
                get started.
              </Paragraph>
            </>
          )}
          {data && data.content.length > 0 && (
            <>
              <Title>Create workspace</Title>
              <Paragraph>
                Give it a title and start collaborating with your team.
              </Paragraph>
            </>
          )}
        </div>

        <div className="workspace-create-form">
          <div className="workspace-create-title-form">
            <Form name="workspace-create" onFinish={onFinish}>
              <Form.Item
                label="Title"
                name="title"
                rules={titleRules}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                hasFeedback
              >
                <Input
                  placeholder="ex. My Assignments"
                  count={{ show: true, max: 25 }}
                  disabled={disabled || loading}
                />
              </Form.Item>
              <Form.Item>
                <div className="workspace-create-title-button">
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    disabled={disabled || loading}
                  >
                    Create Workspace
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceCreate;
