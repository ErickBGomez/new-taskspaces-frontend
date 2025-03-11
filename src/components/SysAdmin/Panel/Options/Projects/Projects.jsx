import { useState } from 'react';
import { Button, Input, Form, List, Modal, message } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import './Projects.scss';

export default function Projects() {
  const [projects, setProjects] = useState([
    { id: 1, name: 'Project X', description: 'Description of Project X' },
    { id: 2, name: 'Project Y', description: 'Description of Project Y' }
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [form] = Form.useForm();

  const handleAdd = (values) => {
    const newProject = { id: Date.now(), ...values };
    setProjects([...projects, newProject]);
    message.success('Project added successfully!');
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    form.setFieldsValue(project);
    setIsModalVisible(true);
  };

  const handleUpdate = (values) => {
    setProjects(
      projects.map((project) =>
        project.id === editingProject.id ? { ...project, ...values } : project
      )
    );
    message.success('Project updated successfully!');
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleDelete = (id) => {
    setProjects(projects.filter((project) => project.id !== id));
    message.success('Project deleted successfully!');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div className="projects-container">
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setIsModalVisible(true)}
      >
        Add Project
      </Button>

      <List
        dataSource={projects}
        renderItem={(project) => (
          <List.Item
            actions={[
              <EditOutlined onClick={() => handleEdit(project)} />,
              <DeleteOutlined onClick={() => handleDelete(project.id)} />
            ]}
          >
            <List.Item.Meta
              title={project.name}
              description={project.description}
            />
          </List.Item>
        )}
      />

      <Modal
        title={editingProject ? 'Edit Project' : 'Add Project'}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          onFinish={editingProject ? handleUpdate : handleAdd}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="Project Name"
            rules={[{ required: true, message: 'Please input project name' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="Project Description"
            rules={[{ required: true, message: 'Please input project description' }]}
          >
            <Input />
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={false}>
            {editingProject ? 'Update Project' : 'Add Project'}
          </Button>
        </Form>
      </Modal>
    </div>
  );
}
