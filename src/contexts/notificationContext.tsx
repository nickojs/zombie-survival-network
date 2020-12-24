import React, { useContext, useEffect, useState } from 'react';

interface NotificationContextProps {
  notification: string | null;
  messageHandler(msg: string): void;
}

export const NotificationContext = React.createContext<NotificationContextProps>(
  {} as NotificationContextProps
);

export const NotificationProvider: React.FC = ({ children }) => {
  const [message, setMessage] = useState<string | null>(null);

  const setMessageHandler = (msg: string) => setMessage(msg);

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      setMessage(null);
    }, 3000);

    return () => { clearTimeout(timer); };
  }, [message]);

  return (
    <NotificationContext.Provider
      value={{
        notification: message,
        messageHandler: setMessageHandler
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
