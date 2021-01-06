import React, { useContext, useEffect, useState } from 'react';
import { User } from '../models/user';
import api from '../services/api';

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

  const signIn = async (token: string) => {
    setToken(token);
    localStorage.setItem('auth_token', token);

    await updateUser();
  };

  const updateUser = async () => {
    const request = await api.post('/user/self');
    const { data }: { data: User } = request;

    setUser(data);
  };

  const signOut = () => {
    setToken('');
    setUser(null);
    localStorage.removeItem('auth_token');
  };

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      signIn(token);
    }
  }, []);

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
