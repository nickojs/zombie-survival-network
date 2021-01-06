import React, { useContext, useEffect, useState } from 'react';
import { User, UserProfile } from '../models/user';
import api from '../services/api';

export interface Survivor extends User {
  profile: UserProfile;
}

interface SurvivorContextProps {
  survivor: Survivor | null;
  survivorList: Survivor[] | undefined;
  survivorHandler(survivor: Survivor): void;
  updateSurvivorList(): void;
}

export const SurvivorContext = React.createContext<SurvivorContextProps>(
  {} as SurvivorContextProps
);

export const SurvivorProvider: React.FC = ({ children }) => {
  const [survivor, setSurvivor] = useState<Survivor | null>(null);
  const [survivorList, setSurvivorList] = useState<Survivor[]>();

  const updateSurvivorList = async () => {
    const request = await api.get('/user/');
    const { data }: { data: Survivor[] } = request;

    setSurvivorList(data);
  };

  const survivorHandler = (survivor: Survivor) => setSurvivor(survivor);

  useEffect(() => {
    updateSurvivorList();
  }, []);

  return (
    <SurvivorContext.Provider
      value={{
        survivor,
        survivorList,
        survivorHandler,
        updateSurvivorList
      }}
    >
      {children}
    </SurvivorContext.Provider>
  );
};

export const useSurvivor = () => {
  const context = useContext(SurvivorContext);
  return context;
};
