import { useParams, useNavigate } from 'react-router-dom';
import { tags as globalTags } from '../../../../helpers/fakeDBWorkspace';
import './CalendarTask.scss';
import Paragraph from 'antd/es/typography/Paragraph';

export default function CalendarTask({ task }) {
  const { title, status, tags = [] } = task;
  const { workspaceId, projectId } = useParams();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/w/${workspaceId}/p/${projectId}/t/${task._id}`);
  };

  const borderColor = (status) => {
    switch (status) {
      case 'pending':
        return '#2E88DD';
      case 'doing':
        return '#DD972E';
      case 'done':
        return '#34B86B';
      default:
        return '#CCCCCC';
    }
  };

  return (
    <div
      className="calendar-task"
      style={{ borderLeft: `8px solid ${borderColor(status.title)}` }}
      onClick={handleClick}
    >
      <div className="task-title">
        <Paragraph>{title}</Paragraph>
      </div>
      <div className="task-tags">
        {tags.map((tagId) => {
          const tag = globalTags.find((tag) => tag.id === tagId);
          if (!tag) return null;
          return (
            <div
              key={tag.id}
              className="tag-indicator"
              style={{ backgroundColor: tag.color }}
            />
          );
        })}
      </div>
      <div className="task-collaborators">
        {/* {collaborators.map((collaboratorId, index) => {
          const collaborator = globalCollaborators.find(
            (c) => c.id === collaboratorId
          ); */}
        {/* return (
            <Image
              preview={false}
              key={collaborator.id}
              src={collaborator.picture}
              alt={collaborator.username}
              className="collaborator-avatar"
              style={{ zIndex: collaborators.length - index }}
            />
          );
        })} */}
      </div>
    </div>
  );
}
