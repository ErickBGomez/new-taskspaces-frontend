import { Button, Form, Input, Modal, ColorPicker, Tag } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/auth/AuthContext';
import useFetchData from '../../hooks/useFetchData';
import { useParams } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import './TagsManager.scss';

const TagsManager = ({ open, closeModal, tags, setTags }) => {
  const { token } = useContext(AuthContext);
  const { projectId } = useParams();
  const { data, loading, error } = useFetchData(`tags/p/${projectId}`, token);
  const [form] = Form.useForm();
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('#000');

  useEffect(() => {
    if (data) {
      setTags(data.content);
    }
  }, [data]);

  const handleAddTag = (values) => {
    setTitle(values.title);
    setColor(values.color);

    const newTags = [...tags];
    newTags.push({ title: values.title, color: values.color });

    if (title.trim()) {
      setTags(newTags);
    }
    console.log(tags);
  };

  const handleRemoveTag = (index) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCreateTag = () => {
    form.submit();
  };

  return (
    <>
      <Modal
        centered
        open={open}
        onCancel={closeModal}
        className="tag-manager"
        closeIcon={null}
        okText="Save"
        onOk={handleOk}
        cancelText="Cancel"
        title="Manage your tags"
        loading={loading}
        width="auto"
      >
        <Form form={form} onFinish={handleAddTag}>
          <div>
            <Form.Item label="Title" name="title">
              <Input placeholder="Tag title" style={{ marginRight: '8px' }} />
            </Form.Item>
            <Form.Item label="Color" name="color">
              <Input type="color" style={{ marginRight: '8px' }} />
            </Form.Item>
            <Button type="primary" onClick={handleCreateTag}>
              Create tag
            </Button>
            <div style={{ marginTop: '16px' }}>
              {tags.map((tag, index) => (
                <Tag
                  key={index}
                  color={tag.color}
                  closable
                  onClose={() => handleRemoveTag(index)}
                >
                  {tag.title}
                </Tag>
              ))}
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default TagsManager;
