import { useParams, useNavigate } from 'react-router-dom';
import Paragraph from 'antd/es/typography/Paragraph';
import './ColumnTaskCard.scss';
import Profile from '../../../Profile/Profile';
import Tag from '../../../Tag/Tag';

export default function ColumnTaskCard({ task }) {
  const { workspaceId, projectId } = useParams();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/w/${workspaceId}/p/${projectId}/t/${task._id}`);
  };

  return (
    <>
      <div className="taskcard" onClick={handleClick}>
        <div className="taskcard-container">
          <div className="taskcard-title">
            <Paragraph>{task.title}</Paragraph>
          </div>
          <div className="tags">
            <Tag label={task.tag} />
          </div>
          <div className="taskcard-collaborators">
            {task.members.map((member, index) => (
              <Profile
                key={index}
                user={member}
                size={40}
                className="collaborator-avatar"
                style={{ right: `${index * 30}px` }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
