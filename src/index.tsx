import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { NotificationProvider } from './contexts/notificationContext';
import { AuthProvider } from './contexts/authContext';
import { SurvivorProvider } from './contexts/survivorContext';
import { ModulesProvider } from './contexts/modulesContext';
import { SocketProvider } from './contexts/socketContext';
import { TradeProvider } from './contexts/tradeContext';

ReactDOM.render(
  <React.StrictMode>
    <NotificationProvider>
      <AuthProvider>
        <ModulesProvider>
          <SocketProvider>
            <TradeProvider>
              <SurvivorProvider>
                <App />
              </SurvivorProvider>
            </TradeProvider>
          </SocketProvider>
        </ModulesProvider>
      </AuthProvider>
    </NotificationProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
