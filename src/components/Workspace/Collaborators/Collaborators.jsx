import CollaboratorsCarousel from './CollaboratorsCarousel/CollaboratorsCarousel';
import './Collaborators.scss';
import Paragraph from 'antd/es/typography/Paragraph';

export default function Collaborators({ collaborators }) {
  return (
    <>
      <div className="collaborators">
        <div className="collaborators-title">
          <Paragraph>Members</Paragraph>
        </div>
        <div className="collaborators-carousel-main">
          <CollaboratorsCarousel collaborators={collaborators} />
        </div>
      </div>
    </>
  );
}
