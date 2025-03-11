import { useContext } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import ProjectHeader from '../ProjectHeader/ProjectHeader';
import { AuthContext } from '../../context/auth/AuthContext';
import useFetchData from '../../hooks/useFetchData';
import './ProjectPage.scss';
import { Spin } from 'antd';
import NotFound from '../../pages/NotFound/NotFound';

export default function ProjectPage() {
  const { token } = useContext(AuthContext);
  const { workspaceId, projectId } = useParams();
  const { data, loading, error } = useFetchData(
    `projects/${projectId}/w/${workspaceId}`,
    token
  );

  if (loading) return <Spin />;

  if (error) return <div>Error: {error.message}</div>;

  if (data) {
    if (!data.content) return <NotFound type="project" />;

    return (
      <div className="page-container">
        <ProjectHeader project={data.content} />
        <Outlet />
      </div>
    );
  }
  return null;
}
