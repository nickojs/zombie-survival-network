import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { NotificationProvider } from './contexts/notificationContext';
import { AuthProvider } from './contexts/authContext';
import { SurvivorProvider } from './contexts/survivorContext';
import { ModulesProvider } from './contexts/modulesContext';

ReactDOM.render(
  <React.StrictMode>
    <ModulesProvider>
      <NotificationProvider>
        <AuthProvider>
          <SurvivorProvider>
            <App />
          </SurvivorProvider>
        </AuthProvider>
      </NotificationProvider>
    </ModulesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
