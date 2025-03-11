import { useContext, useState } from 'react';
import './CollaboratorsCarousel.scss';
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Button, Form, Input, Modal, App, Select } from 'antd';
import CollaboratorsCarouselCard from '../CollaboratorsCarouselCard/CollaboratorsCarouselCard';
import Paragraph from 'antd/es/typography/Paragraph.js';
import { usernameRules } from '../../../../helpers/forms/userRegisterValidation.js';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../../../context/auth/AuthContext.jsx';
import usePutDataInserted from '../../../../hooks/usePutDataInserted.js';

export default function CollaboratorsCarousel({ collaborators }) {
  const [form] = Form.useForm();
  const [current, setCurrent] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { workspaceId } = useParams();
  const { token } = useContext(AuthContext);
  const { message } = App.useApp();
  const { putData, loading, error } = usePutDataInserted(
    `workspaces/${workspaceId}/member/:username`,
    token
  );
  const slideCollaborators = 3;
  const visibleCollaborators = collaborators.slice(
    current,
    current + slideCollaborators
  );

  const roles = ['admin', 'collaborator', 'reader'];
  const rolesOptions = roles.map((role, index) => ({
    index,
    label: role.charAt(0).toUpperCase() + role.slice(1),
    value: role,
  }));

  const handleNext = () => {
    if (current + slideCollaborators < collaborators.length) {
      setCurrent(current + slideCollaborators);
    }
  };

  const handlePrev = () => {
    if (current - slideCollaborators >= 0) {
      setCurrent(current - slideCollaborators);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOkModal = () => {
    form.submit();
  };

  const handleInviteMember = async (values) => {
    try {
      await putData(values, { username: values.username });

      if (!error) {
        message.success('Member invited successfully');
        form.resetFields();
        closeModal();
      }
    } catch (e) {
      message.error('Error inviting member');
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
      >
        <Form
          onFinish={handleInviteMember}
          form={form}
          initialValues={{ role: 'reader' }}
          className="invite-form"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={usernameRules}
            hasFeedback
          >
            <Input placeholder="ex. johndoe" />
          </Form.Item>
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
      <div className="collaborators-carousel">
        <div className="collaborators-carousel-container">
          <div className="collaboratos-carousel-left">
            <Button
              icon={<ArrowLeftOutlined />}
              type="text"
              onClick={handlePrev}
            />
          </div>
          <div className="collaborators-carousel-slide">
            {visibleCollaborators.map((collaboratorsData, index) => (
              <CollaboratorsCarouselCard
                key={index}
                collaboratorsData={collaboratorsData}
              />
            ))}
            <div className="collaborators-carousel-add" onClick={showModal}>
              <div className="collaborators-carousel-add-box">
                <PlusOutlined />
              </div>
              <Paragraph>Invite</Paragraph>
            </div>
          </div>
          <div className="collaborators-carousel-right">
            <Button
              icon={<ArrowRightOutlined />}
              type="text"
              onClick={handleNext}
            />
          </div>
        </div>
      </div>
    </>
  );
}
