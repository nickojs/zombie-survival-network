import React, { FunctionComponent, useContext, useState } from 'react';

// available modules
import Profile from '../components/profile';
import SurvivorList from '../components/survivorList';
import Location from '../components/location';
import { below, right } from '../constant';

const Modules = [
  {
    id: 'profile',
    name: 'Profile',
    Component: Profile,
    display: false,
    isDockable: false,
    screenPos: {
      x: right,
      y: 0
    }
  },
  {
    id: 'survivorList',
    name: 'Survivors',
    Component: SurvivorList,
    display: true,
    isDockable: true,
    screenPos: {
      x: 0,
      y: 0
    }
  },
  {
    id: 'location',
    name: 'Location',
    Component: Location,
    display: false,
    isDockable: false,
    screenPos: {
      x: right,
      y: below
    }
  }
];

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
  toggleModule(moduleId: string): void;
  isSelected(moduleId: string): boolean;
}

export const ModulesContext = React.createContext<ModulesContextProps>(
  {} as ModulesContextProps
);

export const ModulesProvider: React.FC = ({ children }) => {
  const [modules, setModules] = useState<Module[]>([...Modules]); // setting default modules for now

  const toggleModule = (moduleId: string) => {
    const copyState = [...modules];
    const module = copyState.find((module) => module.id === moduleId);
    const moduleIndex = copyState.findIndex((module) => module.id === moduleId);

    if (!module || moduleIndex === -1) return;
    module.display = !module.display;
    copyState.splice(moduleIndex, 1, module);
    setModules(copyState);
  };

  const isSelected = (moduleId: string) => {
    const module = modules.find((module) => module.id === moduleId);
    if (!module) return false;
    return module.display;
  };

  return (
    <ModulesContext.Provider
      value={{
        modules,
        toggleModule,
        isSelected
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
