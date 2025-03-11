import { useState } from 'react';
import { Button, Input, Form, List, Modal, message } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import './Workspaces.scss';

export default function Workspaces() {
  const [workspaces, setWorkspaces] = useState([
    { id: 1, name: 'Workspace A', description: 'Description A' },
    { id: 2, name: 'Workspace B', description: 'Description B' }
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingWorkspace, setEditingWorkspace] = useState(null);
  const [form] = Form.useForm();

  const handleAdd = (values) => {
    const newWorkspace = { id: Date.now(), ...values };
    setWorkspaces([...workspaces, newWorkspace]);
    message.success('Workspace added successfully!');
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleEdit = (workspace) => {
    setEditingWorkspace(workspace);
    form.setFieldsValue(workspace);
    setIsModalVisible(true);
  };

  const handleUpdate = (values) => {
    setWorkspaces(
      workspaces.map((workspace) =>
        workspace.id === editingWorkspace.id ? { ...workspace, ...values } : workspace
      )
    );
    message.success('Workspace updated successfully!');
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleDelete = (id) => {
    setWorkspaces(workspaces.filter((workspace) => workspace.id !== id));
    message.success('Workspace deleted successfully!');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <>
      <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
        Add Workspace
      </Button>
      <List
        dataSource={workspaces}
        renderItem={(workspace) => (
          <List.Item
            actions={[
              <Button icon={<EditOutlined />} onClick={() => handleEdit(workspace)} />,
              <Button icon={<DeleteOutlined />} onClick={() => handleDelete(workspace.id)} />,
            ]}
          >
            <List.Item.Meta title={workspace.name} description={workspace.description} />
          </List.Item>
        )}
      />
      <Modal
        title={editingWorkspace ? 'Edit Workspace' : 'Add Workspace'}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={editingWorkspace ? handleUpdate : handleAdd} layout="vertical">
          <Form.Item
            name="name"
            label="Workspace Name"
            rules={[{ required: true, message: 'Please input the workspace name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Workspace Description"
            rules={[{ required: true, message: 'Please input the workspace description' }]}
          >
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            {editingWorkspace ? 'Update' : 'Add'}
          </Button>
        </Form>
      </Modal>
    </>
  );
}
