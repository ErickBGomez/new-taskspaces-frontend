import { useState } from 'react';
import { Button, Input, Form, List, Modal, message } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import './Tags.scss';

export default function Tags() {
  const [tags, setTags] = useState([
    { id: 1, name: 'Urgent' },
    { id: 2, name: 'Low Priority' },
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTag, setEditingTag] = useState(null);
  const [form] = Form.useForm();

  const handleAdd = (values) => {
    const newTag = { id: Date.now(), ...values };
    setTags([...tags, newTag]);
    message.success('Tag added successfully!');
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleEdit = (tag) => {
    setEditingTag(tag);
    form.setFieldsValue(tag);
    setIsModalVisible(true);
  };

  const handleUpdate = (values) => {
    setTags(tags.map((tag) => (tag.id === editingTag.id ? { ...tag, ...values } : tag)));
    message.success('Tag updated successfully!');
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleDelete = (id) => {
    setTags(tags.filter((tag) => tag.id !== id));
    message.success('Tag deleted successfully!');
  };

  return (
    <div className="tags">
      <Button icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>Add Tag</Button>
      <List
        dataSource={tags}
        renderItem={(tag) => (
          <List.Item
            actions={[
              <Button icon={<EditOutlined />} onClick={() => handleEdit(tag)} />,
              <Button icon={<DeleteOutlined />} onClick={() => handleDelete(tag.id)} />
            ]}
          >
            <List.Item.Meta title={tag.name} />
          </List.Item>
        )}
      />

      <Modal
        title={editingTag ? 'Edit Tag' : 'Add Tag'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          onFinish={editingTag ? handleUpdate : handleAdd}
          initialValues={editingTag || {}}
        >
          <Form.Item
            label="Tag Name"
            name="name"
            rules={[{ required: true, message: 'Please input the tag name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingTag ? 'Update' : 'Add'} Tag
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
