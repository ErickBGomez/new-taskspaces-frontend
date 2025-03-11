import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App as AntdApp, ConfigProvider } from 'antd';
import themeConfig from './helpers/themeConfig';

import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import AuthContextProvider from './context/auth/AuthContextProvider.jsx';
import TaskContextProvider from './context/task/TaskContextProvider.jsx';
import SidebarContextProvider from './context/sidebar/SidebarContextProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ConfigProvider theme={themeConfig}>
        <AntdApp>
          <AuthContextProvider>
            <SidebarContextProvider>
              <TaskContextProvider>
                <App />
              </TaskContextProvider>
            </SidebarContextProvider>
          </AuthContextProvider>
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
  </StrictMode>
);
