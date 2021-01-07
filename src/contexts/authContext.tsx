import React, { useContext, useEffect, useState } from 'react';
import { User } from '../models/user';
import useRequest, { Options, State } from '../hooks/useRequest';
import { NotificationTypes, useNotification } from './notificationContext';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female'
}

interface AuthContextProps {
  token: string;
  user?: User | null;
  signIn(token: string): void;
  signOut(): void;
  updateUser(): void;
}

export const AuthContext = React.createContext<AuthContextProps>(
  {} as AuthContextProps
);

export const AuthProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);

  const [options, setOptions] = useState<Options>(null);
  const [requestData] = useRequest(options);
  const { data, error } = requestData as State;

  const { messageHandler } = useNotification();

  const updateUser = async () => {
    setOptions({
      method: 'GET',
      url: 'user/self'
    });
  };

  const signIn = async (token: string) => {
    setToken(token);
    localStorage.setItem('auth_token', token);

    await updateUser();
  };

  const signOut = () => {
    setToken('');
    setUser(null);
    localStorage.clear();
  };

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      signIn(token);
    }
  }, []);

  useEffect(() => {
    if (data) {
      setUser(data as User);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      messageHandler('Something is wrong with your authorization, please log in again', NotificationTypes.ERROR);
      signOut();
    }
  }, [error]);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        signIn,
        signOut,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
