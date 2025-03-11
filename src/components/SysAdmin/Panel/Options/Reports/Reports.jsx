import { useState } from 'react';
import { Button, Input, Form, List, Modal, message } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import './Reports.scss';

export default function Reports() {
  const [reports, setReports] = useState([
    { id: 1, title: 'Report 1', description: 'Description of Report 1' },
    { id: 2, title: 'Report 2', description: 'Description of Report 2' },
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingReport, setEditingReport] = useState(null);
  const [form] = Form.useForm();

  const handleAdd = (values) => {
    const newReport = { id: Date.now(), ...values };
    setReports([...reports, newReport]);
    message.success('Report added successfully!');
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleEdit = (report) => {
    setEditingReport(report);
    form.setFieldsValue(report);
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    setReports(reports.filter((report) => report.id !== id));
    message.success('Report deleted successfully!');
  };

  const handleUpdate = async (values) => {
    const updatedReports = reports.map((report) =>
      report.id === editingReport.id ? { ...report, ...values } : report
    );
    setReports(updatedReports);
    message.success('Report updated successfully!');
    setIsModalVisible(false);
    form.resetFields();
    setEditingReport(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingReport(null);
  };

  return (
    <div className="reports">
      <h2>Reports</h2>

      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setIsModalVisible(true)}
        style={{ marginBottom: 16 }}
      >
        Add Report
      </Button>

      <List
        bordered
        dataSource={reports}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button
                type="link"
                icon={<EditOutlined />}
                onClick={() => handleEdit(item)}
              >
                Edit
              </Button>,
              <Button
                type="link"
                icon={<DeleteOutlined />}
                danger
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={item.title}
              description={item.description}
            />
          </List.Item>
        )}
      />

      {/* Modal for Add/Edit Report */}
      <Modal
        title={editingReport ? 'Edit Report' : 'Add Report'}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          initialValues={editingReport}
          onFinish={editingReport ? handleUpdate : handleAdd}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Please input the title!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please input the description!' }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {editingReport ? 'Update Report' : 'Add Report'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
