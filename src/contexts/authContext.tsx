import React, { useContext, useEffect, useState } from 'react';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female'
}

export interface UserProfile {
  id: string;
  fullName: string;
  age: number;
  gender: Gender
}

export interface User {
  userId: string;
  iat: number;
  email: string;
  username: string;
  profile: UserProfile | null;
}

interface AuthContextProps {
  token: string;
  user?: User | null;
  signIn(token: string): void;
  signOut(): void;
}

export const AuthContext = React.createContext<AuthContextProps>(
  {} as AuthContextProps
);

export const AuthProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState<string>('');
  const [user, setUser] = useState<User>();

  const signIn = (token: string) => {
    setToken(token);
    const data = jwt_decode(token) as User;
    setUser(data);
    localStorage.setItem('auth_token', token);
  };

  const signOut = () => {
    setToken('');
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
        signOut
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