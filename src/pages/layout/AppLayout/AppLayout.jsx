import { useContext } from 'react';
import { SidebarContext } from '../../../context/sidebar/SidebarContext';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../../components/Sidebar/Sidebar';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import './AppLayout.scss';

const AppLayout = () => {
  const { sidebarState } = useContext(SidebarContext);

  const sidebarStateString = sidebarState ? 'sidebar-active' : '';

  return (
    <>
      <div>
        <Sidebar />
      </div>
      <div className={`app-content ${sidebarStateString}`}>
        <Header hasSidebar={true} />
        <div className="content">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default AppLayout;
