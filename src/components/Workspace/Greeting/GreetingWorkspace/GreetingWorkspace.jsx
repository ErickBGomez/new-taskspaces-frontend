import { EditOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useState } from 'react';
import './GreetingWorkspace.scss';
import Paragraph from 'antd/es/typography/Paragraph';
import Title from 'antd/es/typography/Title';

export default function GreetingWorkspace({ title }) {
  const handleEditClick = () => {
    {
      /* TODO ADD WORKSPACE OVERLAY */
    }
    console.log('Edit workspace overlay');
  };

  return (
    <>
      <div className="greeting-workspace">
        <div className="greeting-workspace-text">
          <Paragraph>Current Workspace</Paragraph>
        </div>
        <div className="greeting-workspace-title">
          <Title level={1}>{title}</Title>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={handleEditClick}
            className="workspace-overlay-button"
          />
        </div>
      </div>
    </>
  );
}
