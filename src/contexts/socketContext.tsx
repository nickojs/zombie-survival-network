import React, { useContext, useEffect } from 'react';
import io from 'socket.io-client';
import { useAuth } from './authContext';

const socket = io(process.env.REACT_APP_DEV_SOCKET as string);

export enum SocketEvents {
  SAVE_USER = 'save_user',
  SEND_ITEMS = 'send_items',
  DELIVER_ITEMS = 'deliver_items',
  ACCEPT_TRADE = 'accept_trade',
  DECLINE_TRADE = 'decline_trade',
  SENDER_ACKNOWLEDGE = 'sender_acknowledge',
  RECIPIENT_ACKNOWLEDGE = 'recipient_acknowledge',
  REQUEST_USER_STATUS = 'request_user_status',
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
  const emitEvent = (event: string, data?: Record<string, any>) => {
    socket.emit(event, data);
  };

  const onEvent = (event: string, cb: (...args: any[]) => void) => {
    socket.on(event, cb);
  };

  useEffect(() => {
    if (user) socket.emit(SocketEvents.SAVE_USER, user.id);
  }, [user]);

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
