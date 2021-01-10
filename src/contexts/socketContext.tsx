import React, { useContext } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:7001');

export enum SocketEvents {
  SET_ITEMS = 'set_items',
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
  const emitEvent = (event: string, data?: Record<string, any>) => {
    socket.emit(event, data);
  };

  const onEvent = (event: string, cb: (...args: any[]) => void) => {
    socket.on(event, cb);
  };

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
