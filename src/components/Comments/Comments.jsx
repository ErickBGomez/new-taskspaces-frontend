import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../context/auth/AuthContext';
import useFetchData from '../../hooks/useFetchData';
import { Spin } from 'antd';
import CommentCard from './CommentCard/CommentCard';
import './Comments.scss';

const Comments = ({ newComment }) => {
  const { taskId } = useParams();
  const { token } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const { data, loading, error } = useFetchData(`comments/t/${taskId}`, token);

  useEffect(() => {
    if (data) setComments([...data.content, ...newComment]);
  }, [data, newComment]);

  const onDelete = (id) => {
    if (comments.length === 1) return setComments([]);

    setComments((prevComments) =>
      prevComments.filter((comment) => comment._id !== id)
    );
  };

  if (loading) return <Spin />;

  if (data) {
    const commentsMapped = comments.map((comment) => (
      <CommentCard key={comment._id} data={comment} onDelete={onDelete} />
    ));

    return (
      <div className="comments-container">
        {commentsMapped.length ? (
          commentsMapped
        ) : (
          <div className="no-comments">No comments yet...</div>
        )}
      </div>
    );
  }
};

export default Comments;
