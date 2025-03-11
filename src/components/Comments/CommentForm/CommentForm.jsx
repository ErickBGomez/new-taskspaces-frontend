import { Button, Form, Input, App } from 'antd';
import { UserOutlined, SendOutlined } from '@ant-design/icons';
import './CommentForm.scss';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../context/auth/AuthContext';
import { useParams } from 'react-router-dom';
import usePostData from '../../../hooks/usePostData';
import Comments from '../Comments';

const CommentForm = () => {
  const { token } = useContext(AuthContext);
  const { taskId } = useParams();
  const { postData, loading, error } = usePostData(
    `comments/t/${taskId}`,
    token
  );
  const [newComment, setNewComment] = useState([]);
  const { message } = App.useApp();

  const sendComment = async (comment, field) => {
    if (!comment.content) return;

    try {
      const response = await postData(comment);
      setNewComment([response.content]);
      message.success('Comment sent successfully');
      // TODO: Comment is not resetting after sending
      field.value = '';
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className="comment">
        <div className="comment-form" name="comment-form">
          <div className="comment-input">
            <Input
              placeholder="Write a comment..."
              id="content"
              onPressEnter={(e) => {
                e.preventDefault();
                sendComment({ content: e.target.value }, e.target);
              }}
            />
          </div>
          <div>
            <Button
              type="default"
              loading={loading}
              onClick={() => {
                const commentInput = document.getElementById('content');
                sendComment({ content: commentInput.value }, commentInput);
              }}
            >
              <SendOutlined />
            </Button>
          </div>
        </div>
      </div>
      <div className="comment-done">
        <Comments newComment={newComment} />
      </div>
    </>
  );
};

export default CommentForm;
