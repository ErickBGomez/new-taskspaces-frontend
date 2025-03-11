import { useContext } from 'react';
import { AuthContext } from './context/auth/AuthContext';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import ForgotPasswordSend from './components/ForgotPassword/ForgotPasswordSend/ForgotPasswordSend';
import ForgotPasswordReset from './components/ForgotPassword/ForgotPasswordReset/ForgotPasswordReset';
import ProtectedRoute from './helpers/ProtectedRoute';
import ProjectPage from './components/ProjectViews/ProjectPage';
import UserSettings from './components/Settings/UserSettings/UserSettings';
import WorkspaceSettings from './components/Settings/WorkspaceSettings/WorkspaceSettings';
import ProjectSettings from './components/Settings/ProjectSettings/ProjectSettings';
import './App.scss';
import WorkspaceCreate from './components/Workspace/WorkspaceCreate/WorkspaceCreate';
import { WorkspaceAuth } from './pages/WorkspaceAuth/WorkspaceAuth';
import WorkspacePage from './pages/WorkspacePage/WorkspacePage';
import MainLayout from './pages/layout/MainLayout/MainLayout';
import AppLayout from './pages/layout/AppLayout/AppLayout';
import PanelSA from './components/SysAdmin/Panel/PanelSA'
import Accounts from './components/SysAdmin/Panel/Options/Accounts/Accounts';
import Workspaces from './components/SysAdmin/Panel/Options/Workspaces/Workspaces';
import Projects from './components/SysAdmin/Panel/Options/Projects/Projects';
import Tasks from './components/SysAdmin/Panel/Options/Tasks/Tasks';
import Tags from './components/SysAdmin/Panel/Options/Tags/Tags';
import Reports from './components/SysAdmin/Panel/Options/Reports/Reports';
import TaskDialog from './components/TaskDialog/TaskDialog';

import NotFound from './pages/NotFound/NotFound';

function App() {
  const { token } = useContext(AuthContext);

  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* home and login */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPasswordSend />} />
        <Route path="/reset-password" element={<ForgotPasswordReset />} />
        {/* workspaces */}
        <Route
          path="/w/"
          element={
            <ProtectedRoute token={token} redirect="/">
              <WorkspaceAuth />
            </ProtectedRoute>
          }
        />
        <Route
          path="/w-create/"
          element={
            <ProtectedRoute token={token} redirect="/">
              <WorkspaceCreate />
            </ProtectedRoute>
          }
        />

        <Route
          path="/w/:workspaceId"
          element={
            <ProtectedRoute token={token} redirect="/">
              <WorkspacePage />
            </ProtectedRoute>
          }
        />
        {/* projects */}
        <Route
          path="/w/:workspaceId/p/:projectId"
          element={
            <ProtectedRoute token={token} redirect="/">
              <ProjectPage />
            </ProtectedRoute>
          }
        >
          <Route
            path="t/:taskId"
            element={
              <ProtectedRoute token={token} redirect="/">
                <TaskDialog />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route
          path="settings"
          element={
            <ProtectedRoute token={token} redirect="/">
              <UserSettings />
            </ProtectedRoute>
          }
        />
        <Route
          path="workspace-dialog"
          element={
            <ProtectedRoute token={token} redirect="/">
              <WorkspaceSettings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/w/:workspaceId/p/:projectId/project-dialog"
          element={
            <ProtectedRoute token={token} redirect="/">
              <ProjectSettings />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Panel Admin (SysAdmin) */}
      <Route
          path="/admin/panel"
          element={
            <ProtectedRoute token={token} redirect="/">
              <PanelSA />
            </ProtectedRoute>
          }
        />

        {/* Admin Pages */}
        <Route
          path="/admin/panel/accounts"
          element={
            <ProtectedRoute token={token} redirect="/">
              <Accounts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/panel/workspaces"
          element={
            <ProtectedRoute token={token} redirect="/">
              <Workspaces />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/panel/projects"
          element={
            <ProtectedRoute token={token} redirect="/">
              <Projects />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/panel/tags"
          element={
            <ProtectedRoute token={token} redirect="/">
              <Tags />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/panel/tasks"
          element={
            <ProtectedRoute token={token} redirect="/">
              <Tasks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/panel/reports"
          element={
            <ProtectedRoute token={token} redirect="/">
              <Reports />
            </ProtectedRoute>
          }
        />
    </Routes>
  );
}

export default App;
