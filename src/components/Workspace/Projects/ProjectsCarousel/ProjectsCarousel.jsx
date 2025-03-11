import { useState, useContext } from 'react';
import ProjectCarouselCard from '../ProjectCarouselCard/ProjectCarouselCard';
import './ProjectsCarousel.scss';
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Button, Modal, Form, Input, App } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph.js';
import usePostData from '../../../../hooks/usePostData';
import { AuthContext } from '../../../../context/auth/AuthContext';
import { titleRules } from '../../../../helpers/forms/projectValidation';
import { useNavigate, useParams } from 'react-router-dom';

export default function ProjectCarousel({ projects }) {
  const [current, setCurrent] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const { message } = App.useApp();
  const { token } = useContext(AuthContext);
  const { workspaceId } = useParams();
  const { postData, loading, error } = usePostData(
    `projects/w/${workspaceId}`,
    token
  );
  const slideProjects = 3;
  const visibleProjects = projects.slice(current, current + slideProjects);
  const navigate = useNavigate();

  const handleNext = () => {
    if (current + slideProjects < projects.length) {
      setCurrent(current + slideProjects);
    }
  };

  const handlePrev = () => {
    if (current - slideProjects >= 0) {
      setCurrent(current - slideProjects);
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

  const handleCreateProject = async (values) => {
    try {
      const response = await postData(values);

      if (!error) {
        message.success('Project created successfully');

        navigate(`/w/${workspaceId}/p/${response.content._id}`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Modal
        title="Create new project"
        open={isModalOpen}
        onOk={handleOkModal}
        okText="Create project"
        onCancel={closeModal}
        centered
        closeIcon={false}
      >
        <Form onFinish={handleCreateProject} form={form}>
          <Form.Item label="Title" name="title" rules={titleRules} hasFeedback>
            <Input placeholder="ex. College" />
          </Form.Item>
        </Form>
      </Modal>
      <div className="projects-carousel">
        <div className="projects-carousel-container">
          <div className="projects-carousel-left">
            <Button
              icon={<ArrowLeftOutlined />}
              type="text"
              onClick={handlePrev}
            />
          </div>
          <div className="project-carousel-slide">
            {visibleProjects.map((projectData, index) => (
              <ProjectCarouselCard key={index} projectData={projectData} />
            ))}
            <div className="project-carousel-add" onClick={showModal}>
              <div className="project-carousel-add-box">
                <PlusOutlined />
              </div>
              <Paragraph>New</Paragraph>
            </div>
          </div>
          <div className="project-carousel-right">
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
