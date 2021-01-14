import React, {
  useContext, useEffect, useRef, useState
} from 'react';

export enum NotificationTypes {
  SUCCESS,
  ERROR,
  WARNING,
  DEFAULT
}

interface NotificationContextProps {
  notification: string;
  type: NotificationTypes;
  show: boolean;
  messageHandler(msg: string, type: NotificationTypes): void;
  dismissNotification(): void;
}

export const NotificationContext = React.createContext<NotificationContextProps>(
  {} as NotificationContextProps
);

export const NotificationProvider: React.FC = ({ children }) => {
  const [notification, setNotification] = useState<string>('');
  const [show, setShow] = useState< boolean>(false);
  const [type, setType] = useState<NotificationTypes>(NotificationTypes.DEFAULT);

  const notificationTimer = useRef<any>();
  const showTimer = useRef<any>();

  const messageHandler = (msg: string, type: NotificationTypes) => {
    if (msg !== notification) {
      setNotification(msg);
      setType(type);
      setShow(true);
    }
  };

  const dismissNotification = () => { setShow(false); };

  useEffect(() => {
    if (notification) {
      showTimer.current = setTimeout(() => {
        setShow(false);
      }, 3000);
    }
    return () => {
      clearTimeout(showTimer.current);
    };
  }, [notification]);

  useEffect(() => {
    if (!show) {
      notificationTimer.current = setTimeout(() => {
        setNotification('');
      }, 1000);

      return () => {
        clearTimeout(notificationTimer.current);
      };
    }
  }, [show]);

  return (
    <NotificationContext.Provider
      value={{
        type,
        notification,
        show,
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
