import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { NotificationProvider } from './contexts/notificationContext';
import { AuthProvider } from './contexts/authContext';
import { SurvivorProvider } from './contexts/survivorContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <NotificationProvider>
        <SurvivorProvider>
          <App />
        </SurvivorProvider>
      </NotificationProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
