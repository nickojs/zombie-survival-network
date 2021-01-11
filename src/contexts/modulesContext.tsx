import React, {
  FunctionComponent, useContext, useState, useEffect
} from 'react';
import useRequest, { Options, State } from '../hooks/useRequest';
import { NotificationTypes, useNotification } from './notificationContext';
import { Modules } from '../constant';
import { useAuth } from './authContext';

export enum ModulesName {
  PROFILE = 'profile',
  SURVIVORLIST = 'survivorList',
  SURVIVOR = 'survivor',
  LOCATION = 'location',
  INVENTORY = 'inventory',
  TRADE = 'trade'
}

export interface Module {
  id: string;
  name: string;
  Component: FunctionComponent;
  display: boolean;
  isDockable: boolean;
  screenPos?: { x: number; y: number };
}

interface ModulesContextProps {
  modules: Module[];
  loading: boolean;
  toggleModule(moduleId: string): void;
  isSelected(moduleId: string): boolean;
  updatePosition(moduleId: string, position: Position): void;
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
  const [modules, setModules] = useState<Module[]>(Modules);

  const [options, setOptions] = useState<Options>(null);
  const [requestData] = useRequest(options);
  const { data, error, loading } = requestData as State;

  const { messageHandler } = useNotification();
  const { user } = useAuth();

  const replaceModule = (moduleId: string): [Module | undefined, Module[], number] => {
    const copyState = [...modules];
    const module = copyState.find((module) => module.id === moduleId);
    const moduleIndex = copyState.findIndex((module) => module.id === moduleId);

    return [module, copyState, moduleIndex];
  };

  const toggleModule = (moduleId: ModulesName) => {
    const [module, copyModules, moduleIndex] = replaceModule(moduleId);

    if (module) {
      module.display = !module.display;
      copyModules.splice(moduleIndex, 1, module);
      setModules(copyModules);
    }
  };

  const isSelected = (moduleId: string) => {
    const module = modules.find((module) => module.id === moduleId);
    if (!module) return false;
    return module.display;
  };

  const updatePosition = (moduleId: string, position: Position) => {
    const [module, copyModules, moduleIndex] = replaceModule(moduleId);

    if (module) {
      module.screenPos = position;
      copyModules.splice(moduleIndex, 1, module);
      setModules(copyModules);
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
        const parsePos: Module[] = JSON.parse(position);
        const copyState = [...modules];

        for (let i = 0; i < copyState.length; i++) {
          const currentMod = copyState[i];
          const mod = parsePos.find((pos) => pos.id === currentMod.id);
          const modIndex = parsePos.findIndex((pos) => pos.id === currentMod.id);
          const mergeMod = { ...currentMod, ...mod };

          if (modIndex > -1) copyState.splice(modIndex, 1, mergeMod);
        }
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
