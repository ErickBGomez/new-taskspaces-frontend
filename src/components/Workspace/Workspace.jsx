import { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/auth/AuthContext.jsx';
import { SidebarContext } from '../../context/sidebar/SidebarContext.jsx';
import useFetchData from '../../hooks/useFetchData.js';
import Collaborators from './Collaborators/Collaborators';
import Greeting from './Greeting/Greeting';
import Projects from './Projects/Projects';
import { Spin } from 'antd';
import { useParams } from 'react-router-dom';
import NotFound from '../../pages/NotFound/NotFound.jsx';
import Inspiration from './Inspiration/Inspiration.jsx';

export default function Workspace() {
  const { token, user } = useContext(AuthContext);
  const { changeSidebarState } = useContext(SidebarContext);
  const { workspaceId } = useParams();
  const { data, loading, error } = useFetchData(
    `workspaces/${workspaceId}`,
    token
  );

  useEffect(() => {
    changeSidebarState(!loading);
  }, [loading]);

  if (loading) {
    return <Spin />;
  }

  if (error) return <p>Error: {error.message}</p>;

  if (data) {
    if (!data.content) return <NotFound type="workspace" />;

    const workspace = data.content;
    const members = workspace.members.slice(1);

    return (
      <>
        <div className="workspace">
          <Greeting user={user} title={workspace.title} />
          <Inspiration />
          <Projects />
          <Collaborators collaborators={members} />
        </div>
      </>
    );
  }

  return null;
}
