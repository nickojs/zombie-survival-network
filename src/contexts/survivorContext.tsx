import React, { useContext, useEffect, useState } from 'react';
import useRequest, { Options, State } from '../hooks/useRequest';
import { User, UserProfile } from '../models/user';
import { useAuth } from './authContext';
import { NotificationTypes, useNotification } from './notificationContext';

export interface Survivor extends User {
  profile: UserProfile;
}

interface SurvivorContextProps {
  survivor: Survivor | null;
  survivorList: Survivor[];
  loading: boolean;
  survivorHandler(survivor: Survivor): void;
  updateSurvivorList(): void;
  clearSurvivor(): void;
}

export const SurvivorContext = React.createContext<SurvivorContextProps>(
  {} as SurvivorContextProps
);

export const SurvivorProvider: React.FC = ({ children }) => {
  const [survivor, setSurvivor] = useState<Survivor | null>(null);
  const [survivorList, setSurvivorList] = useState<Survivor[]>([]);

  const [options, setOptions] = useState<Options>(null);
  const [requestData] = useRequest(options);
  const { data, error, loading } = requestData as State;

  const { messageHandler } = useNotification();
  const { token } = useAuth();

  const updateSurvivorList = async () => {
    setOptions({
      method: 'GET',
      url: 'user/'
    });
  };

  const survivorHandler = (survivor: Survivor) => setSurvivor(survivor);

  const clearSurvivor = () => setSurvivor(null);

  useEffect(() => {
    if (token) updateSurvivorList();
  }, [token]);

  useEffect(() => {
    if (error) {
      messageHandler(error, NotificationTypes.ERROR);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      messageHandler(data.message, NotificationTypes.SUCCESS);
      setSurvivorList(data as Survivor[]);
    }
  }, [data]);

  return (
    <SurvivorContext.Provider
      value={{
        survivor,
        survivorList,
        loading,
        survivorHandler,
        updateSurvivorList,
        clearSurvivor
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
