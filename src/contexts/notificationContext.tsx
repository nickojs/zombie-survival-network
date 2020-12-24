import React, { useContext, useEffect, useState } from 'react';

export enum NotificationTypes {
  SUCCESS,
  ERROR,
  WARNING,
  DEFAULT
}

interface NotificationContextProps {
  notification: string | null;
  type: NotificationTypes;
  messageHandler(msg: string, type: NotificationTypes): void;
  dismissNotification(): void;
}

export const NotificationContext = React.createContext<NotificationContextProps>(
  {} as NotificationContextProps
);

export const NotificationProvider: React.FC = ({ children }) => {
  const [notification, setNotification] = useState<string | null>(null);
  const [type, setType] = useState<NotificationTypes>(NotificationTypes.DEFAULT);

  const messageHandler = (msg: string, type: NotificationTypes) => {
    setNotification(msg);
    setType(type);
  };

  const dismissNotification = () => setNotification(null);

  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(() => {
      setNotification(null);
    }, 3000);

    return () => { clearTimeout(timer); };
  }, [notification]);

  return (
    <NotificationContext.Provider
      value={{
        type,
        notification,
        messageHandler,
        dismissNotification
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  return context;
};
