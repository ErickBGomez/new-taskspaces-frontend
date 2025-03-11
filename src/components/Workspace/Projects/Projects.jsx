import { useContext } from 'react';
import ProjectCarousel from './ProjectsCarousel/ProjectsCarousel';
import './Projects.scss';
import Paragraph from 'antd/es/typography/Paragraph';
import useFetchData from '../../../hooks/useFetchData';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../../context/auth/AuthContext';
import { Skeleton } from 'antd';

const projects = [];

export default function Projects() {
  const { workspaceId } = useParams();
  const { token } = useContext(AuthContext);
  const { data, loading, error } = useFetchData(
    `projects/w/${workspaceId}`,
    token
  );

  if (loading) {
    return <Skeleton active />;
  }

  if (data)
    return (
      <>
        <div className="projects">
          <div className="projects-title">
            <Paragraph>Projects</Paragraph>
          </div>
          <div className="projects-carousel-main">
            <ProjectCarousel projects={data.content} />
          </div>
        </div>
      </>
    );

  return null;
}
