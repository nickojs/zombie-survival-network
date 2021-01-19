import React, { useContext, useState, useEffect } from 'react';
import useRequest, { Options, State } from '../hooks/useRequest';
import { NotificationTypes, useNotification } from './notificationContext';
import { Modules } from '../constant';
import { useAuth } from './authContext';

export enum ModulesName {
  PROFILE = 'profile',
  SURVIVORLIST = 'survivorList',
  SURVIVOR = 'survivor',
  LOCATION = 'location',
  INVENTORY = 'inventory'
}

export interface Module {
  name: string;
  display: boolean;
  isDockable: boolean;
  screenPos: { x: number; y: number };
}

type ModulesObj = {
  [key in ModulesName]: Module;
}

interface ModulesContextProps {
  modules: ModulesObj;
  loading: boolean;
  toggleModule(moduleId: ModulesName): void;
  isSelected(moduleId: ModulesName): boolean;
  updatePosition(moduleId: ModulesName, position: Position): void;
  uploadModulesPos(): void;
}

export interface Position {
  x: number;
  y: number;
}

export const ModulesContext = React.createContext<ModulesContextProps>(
  {} as ModulesContextProps
);

export const ModulesProvider: React.FC = ({ children }) => {
  const [modules, setModules] = useState<ModulesObj>(Modules);

  const [options, setOptions] = useState<Options>(null);
  const [requestData] = useRequest(options);
  const { data, error, loading } = requestData as State;

  const { messageHandler } = useNotification();
  const { user } = useAuth();

  const toggleModule = (moduleId: ModulesName) => {
    const copyState = { ...modules };
    const module = copyState[moduleId];

    if (module) {
      module.display = !module.display;
      setModules(copyState);
    }
  };

  const isSelected = (moduleId: ModulesName) => modules[moduleId].display;

  const updatePosition = (moduleId: ModulesName, position: Position) => {
    const copyState = { ...modules };
    const module = copyState[moduleId];

    if (module) {
      module.screenPos = position;
      setModules(copyState);
    }
  };

  const uploadModulesPos = () => setOptions({
    method: 'PUT',
    url: 'user/containers',
    data: { position: JSON.stringify(modules) }
  });

  useEffect(() => {
    if (error) { messageHandler(error, NotificationTypes.ERROR); }
  }, [error]);

  useEffect(() => {
    if (data) { messageHandler(data.message, NotificationTypes.SUCCESS); }
  }, [data]);

  // this effect relies on 'user', but should only run on mount
  // adding 'user' to the deps make the Modules be re-written to the user's previous saved position
  useEffect(() => {
    if (user) {
      const { containers } = user;
      if (containers) {
        const { position } = containers;
        const parsePos: ModulesObj = JSON.parse(position);
        const copyState = { ...modules, ...parsePos };
        setModules(copyState);
      }
    }
  }, []);

  return (
    <ModulesContext.Provider
      value={{
        modules,
        loading,
        toggleModule,
        isSelected,
        updatePosition,
        uploadModulesPos
      }}
    >
      {children}
    </ModulesContext.Provider>
  );
};

export const useModules = () => {
  const context = useContext(ModulesContext);
  return context;
};
