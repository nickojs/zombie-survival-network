import React, { FunctionComponent, useContext, useState } from 'react';

// available modules
import Profile from '../components/profile';
import SurvivorList from '../components/survivorList';

const Modules = [
  {
    id: 'profile',
    Component: Profile,
    display: false,
    isDockable: false
  },
  {
    id: 'survivorList',
    Component: SurvivorList,
    display: true,
    isDockable: true
  }
];

export interface Module {
  id: string;
  Component: FunctionComponent;
  display: boolean;
  isDockable: boolean;
}

interface ModulesContextProps {
  modules: Module[];
  toggleModule(moduleId: string): void;
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

    if (!module || !moduleIndex) return;
    module.display = !module.display;
    copyState.splice(moduleIndex, 1, module);
    setModules(copyState);
  };

  return (
    <ModulesContext.Provider
      value={{
        modules,
        toggleModule
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
