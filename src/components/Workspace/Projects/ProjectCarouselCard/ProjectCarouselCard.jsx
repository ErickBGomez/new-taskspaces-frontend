import Paragraph from 'antd/es/typography/Paragraph';
import './ProjectCarouselCard.scss';
import { useNavigate, useParams } from 'react-router-dom';

export default function ProjectCarouselCard({ projectData }) {
  const { workspaceId } = useParams();
  const navigate = useNavigate();
  const { _id, title, icon } = projectData;

  const handleClick = () => {
    navigate(`/w/${workspaceId}/p/${_id}`);
  };

  return (
    <>
      <div className="project-carousel-card" onClick={handleClick}>
        <div className="project-carousel-card-box">
          <div className="project-carousel-card-icon">{icon}</div>
        </div>
        <div className="project-carousel-card-title">
          <Paragraph>{title}</Paragraph>
        </div>
      </div>
    </>
  );
}
