import {
  App,
  Avatar,
  Button,
  Form,
  Image,
  Modal,
  Popconfirm,
  Select,
} from 'antd';
import './CollaboratorsCarouselCard.scss';
import Paragraph from 'antd/es/typography/Paragraph';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../../context/auth/AuthContext';
import useDeleteDataInserted from '../../../../hooks/useDeleteDataInserted';
import { useParams } from 'react-router-dom';
import usePutDataInserted from '../../../../hooks/usePutDataInserted';
import Profile from '../../../Profile/Profile';

export default function CollaboratorsCarouselCard({ collaboratorsData }) {
  const { role, user } = collaboratorsData;
  const { username, avatar } = user;
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roleState, setRoleState] = useState(role);
  const { workspaceId } = useParams();
  const { token } = useContext(AuthContext);
  const { message } = App.useApp();
  const membersRoute = `workspaces/${workspaceId}/member/:username`;
  const {
    putData,
    loading: putLoading,
    error: putError,
  } = usePutDataInserted(membersRoute, token);
  const {
    putDelete,
    loading: deleteLoading,
    error: deleteError,
  } = useDeleteDataInserted(membersRoute);

  const roles = ['admin', 'collaborator', 'reader'];
  const rolesOptions = roles.map((role, index) => ({
    index,
    label: role.charAt(0).toUpperCase() + role.slice(1),
    value: role,
  }));

  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOkModal = () => {
    form.submit();
  };

  const handleModifyMember = async (values) => {
    try {
      await putData(values, { username });

      if (!putError) {
        message.success('Member modified successfully');
        setRoleState(values.role);
        form.resetFields();
        closeModal();
      }
    } catch (e) {
      message.error('Error modifying member');
    }
  };

  const handleRemoveMember = async () => {
    try {
      await putDelete({ username });

      if (!deleteError) {
        message.success('Member removed successfully');
      }
    } catch (e) {
      message.error('Error removing member');
    }
  };

  return (
    <>
      <Modal
        title="Invite new member"
        open={isModalOpen}
        onOk={handleOkModal}
        okText="Invite"
        onCancel={closeModal}
        centered
        closeIcon={false}
        footer={[
          <Button key="cancel" type="default" onClick={closeModal}>
            Cancel
          </Button>,
          <Popconfirm
            key="delete-popconfirm"
            title="Remove member"
            description="Are you sure to remove this member?"
            onConfirm={handleRemoveMember}
            okText="Yes"
            okButtonProps={{ danger: true }}
            cancelText="No"
          >
            <Button
              key="delete"
              loading={deleteLoading}
              color="danger"
              variant="outlined"
            >
              Remove
            </Button>
          </Popconfirm>,
          <Button
            key="ok"
            type="primary"
            onClick={handleOkModal}
            loading={putLoading}
          >
            Save
          </Button>,
        ]}
      >
        <Form
          onFinish={handleModifyMember}
          form={form}
          initialValues={{ role: roleState }}
          className="invite-form"
        >
          <Form.Item
            label="Role"
            name="role"
            rules={[
              {
                required: true,
                message: 'A role must be selected',
              },
            ]}
            hasFeedback
          >
            <Select options={rolesOptions} />
          </Form.Item>
        </Form>
      </Modal>
      <div className="collaborators-carousel-card" onClick={showModal}>
        <div className="collaborators-carousel-card-box">
          <div className="collaborators-carousel-card-picture">
            <Profile user={user} size={96} />
          </div>
        </div>
        <div className="collaborators-carousel-card-username">
          <Paragraph className="username">{username}</Paragraph>
          <Paragraph className="role">{roleState}</Paragraph>
        </div>
      </div>
    </>
  );
}
