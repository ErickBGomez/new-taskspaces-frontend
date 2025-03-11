import { Content } from 'antd/es/layout/layout';
import './TaskStatus.scss';
import Paragraph from 'antd/es/typography/Paragraph';

export default function TaskStatus({ status }) {
  return (
    <>
      <div className="task-status">
        <Paragraph className="task-status-p">{status.toUpperCase()}</Paragraph>
      </div>
    </>
  );
}
