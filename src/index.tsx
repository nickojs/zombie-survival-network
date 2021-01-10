import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { NotificationProvider } from './contexts/notificationContext';
import { AuthProvider } from './contexts/authContext';
import { SurvivorProvider } from './contexts/survivorContext';
import { ModulesProvider } from './contexts/modulesContext';
import { SocketProvider } from './contexts/socketContext';

ReactDOM.render(
  <React.StrictMode>
    <NotificationProvider>
      <AuthProvider>
        <ModulesProvider>
          <SocketProvider>
            <SurvivorProvider>
              <App />
            </SurvivorProvider>
          </SocketProvider>
        </ModulesProvider>
      </AuthProvider>
    </NotificationProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
