import { Popconfirm, App } from 'antd';
import { compareDateWithToday } from '../../../helpers/dates';
import './CommentCard.scss';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import { AuthContext } from '../../../context/auth/AuthContext';
import useDeleteData from '../../../hooks/useDeleteData';
import { useParams } from 'react-router-dom';
import Profile from '../../Profile/Profile';

const CommentCard = ({ data, onDelete }) => {
  const { user, token } = useContext(AuthContext);
  const { taskId } = useParams();
  const { deleteData, loading, error } = useDeleteData(
    `comments/${data._id}/t/${taskId}`,
    token
  );
  const { message } = App.useApp();
  const compareDate = compareDateWithToday(data.createdAt.split('T')[0]);
  const parsedTime = new Date(data.createdAt).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
  const auth = user._id === data.author._id;

  const handleDelete = async () => {
    try {
      await deleteData();

      if (!error) {
        message.success('Comment deleted successfully');
        onDelete(data._id);
      }
    } catch (e) {
      message.error('An error occurred. Please try again');
    }
  };

  return (
    <div className="comment-card">
      <div className="avatar">
        <Profile user={data.author} size={32} />
      </div>
      <div className="content-container">
        <div className="upper">
          <div className="username">{data.author.username}</div>
          <div className="date-info">
            <span>{compareDate}</span> <span>{parsedTime}</span>
          </div>
          {auth && (
            <div className="actions">
              {/* <EditOutlined className="edit" /> */}
              <Popconfirm
                title="Delete comment"
                description="Are you sure to delete this comment?"
                onConfirm={handleDelete}
                okText="Yes"
                okButtonProps={{ danger: true }}
                cancelText="No"
              >
                <DeleteOutlined className="delete" />
              </Popconfirm>
            </div>
          )}
        </div>
        <div className="content">{data.content}</div>
      </div>
    </div>
  );
};

export default CommentCard;
