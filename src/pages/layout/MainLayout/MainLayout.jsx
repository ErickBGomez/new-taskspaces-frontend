import { Outlet } from 'react-router-dom';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import './MainLayout.scss';

const MainLayout = () => {
  return (
    <main className="main">
      <Header />
      <div className="main-content">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
};

export default MainLayout;
