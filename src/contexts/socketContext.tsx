import React, { useContext, useEffect } from 'react';
import io from 'socket.io-client';
import { useAuth } from './authContext';
import { NotificationTypes, useNotification } from './notificationContext';

const socket = io(process.env.REACT_APP_DEV_SOCKET as string);

export enum SocketEvents {
  // user
  SAVE_USER = 'save_user',
  REQUEST_USER_STATUS = 'request_user_status',
  // items
  SEND_ITEMS = 'send_items',
  DELIVER_ITEMS = 'deliver_items',
  // trade
  RECIPIENT_STATUS = 'recipient_status',
  OPEN_TRADE = 'open_trade',
  ACCEPT_TRADE = 'accept_trade',
  DECLINE_TRADE = 'decline_trade',
  DECLINE_EXISTING_TRADE = 'decline_existing_trade',
  FINISH_TRADE = 'finish_trade',
  // trade mutual approval
  SENDER_ACKNOWLEDGE = 'sender_acknowledge',
  RECIPIENT_ACKNOWLEDGE = 'recipient_acknowledge',
  ERROR = 'error'
}

export interface SocketUser {
  acceptTrade: boolean;
  receivingItems: any[];
  sendingItems: any[];
  socketId: string;
  trading: {
    isTrading: boolean;
    withWho: string;
  }
  userId: string;
}

interface SocketContextProps {
  emitEvent(event: string, data?: Record<string, any>): void;
  onEvent(event: string, cb?: (...args: any[]) => void): void;
  // eslint-disable-next-line no-undef
  socket: SocketIOClient.Socket;
}

export const SocketContext = React.createContext<SocketContextProps>(
  {} as SocketContextProps
);

export const SocketProvider: React.FC = ({ children }) => {
  const { user } = useAuth();
  const { messageHandler } = useNotification();

  const emitEvent = (event: string, data?: Record<string, any>) => {
    socket.emit(event, data);
  };

  const onEvent = (event: string, cb: (...args: any[]) => void) => {
    socket.on(event, cb);
  };

  useEffect(() => {
    if (user) socket.emit(SocketEvents.SAVE_USER, { userId: user.id, username: user.username });
  }, [user]);

  useEffect(() => {
    onEvent(SocketEvents.ERROR, (errorMsg: string) => {
      messageHandler(errorMsg, NotificationTypes.ERROR);
    });
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket,
        emitEvent,
        onEvent
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  return context;
};
