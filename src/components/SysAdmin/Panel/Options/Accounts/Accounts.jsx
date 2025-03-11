import { useState } from 'react';
import { Button, Input, Form, List, Modal, message } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import './Accounts.scss';

export default function Accounts() {
  const [accounts, setAccounts] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com' }
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);
  const [form] = Form.useForm();

  // Manejar la creación de un nuevo usuario
  const handleAdd = (values) => {
    const newAccount = { id: Date.now(), ...values };
    setAccounts([...accounts, newAccount]);
    message.success('Account added successfully!');
    setIsModalVisible(false);
    form.resetFields();
  };

  // Manejar la actualización de un usuario
  const handleEdit = (account) => {
    setEditingAccount(account);
    setIsModalVisible(true);
    form.setFieldsValue(account);
  };

  // Guardar los cambios de un usuario
  const handleUpdate = (values) => {
    const updatedAccounts = accounts.map(account =>
      account.id === editingAccount.id ? { ...account, ...values } : account
    );
    setAccounts(updatedAccounts);
    message.success('Account updated successfully!');
    setIsModalVisible(false);
    setEditingAccount(null);
  };

  // Eliminar un usuario
  const handleDelete = (accountId) => {
    setAccounts(accounts.filter(account => account.id !== accountId));
    message.success('Account deleted successfully!');
  };

  // Mostrar el modal con el formulario
  const handleModalCancel = () => {
    setIsModalVisible(false);
    setEditingAccount(null);
    form.resetFields();
  };

  return (
    <div className="accounts-container">
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setIsModalVisible(true)}
      >
        Add Account
      </Button>

      <List
        dataSource={accounts}
        renderItem={account => (
          <List.Item
            actions={[
              <Button
                type="link"
                icon={<EditOutlined />}
                onClick={() => handleEdit(account)}
              >
                Edit
              </Button>,
              <Button
                type="link"
                icon={<DeleteOutlined />}
                onClick={() => handleDelete(account.id)}
              >
                Delete
              </Button>
            ]}
          >
            <List.Item.Meta
              title={account.name}
              description={account.email}
            />
          </List.Item>
        )}
      />

      <Modal
        title={editingAccount ? 'Edit Account' : 'Add Account'}
        visible={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Form
          form={form}
          onFinish={editingAccount ? handleUpdate : handleAdd}
          layout="vertical"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input the name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input the email!' }]}
          >
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            {editingAccount ? 'Update' : 'Add'}
          </Button>
        </Form>
      </Modal>
    </div>
  );
}
