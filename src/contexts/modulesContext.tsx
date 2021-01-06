import React, {
  FunctionComponent, useContext, useState, useEffect
} from 'react';
import { below, middle, right } from '../constant';

// available modules
import Profile from '../components/profile';
import SurvivorList from '../components/survivor/list';
import Survivor from '../components/survivor/details';
import Location from '../components/location';

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
    id: 'survivor',
    name: 'Details',
    Component: Survivor,
    display: true,
    isDockable: true,
    screenPos: {
      x: middle,
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
  updatePosition(moduleId: string, position: Position): void;
}

export interface Position {
  x: number;
  y: number;
}

export const ModulesContext = React.createContext<ModulesContextProps>(
  {} as ModulesContextProps
);

export const ModulesProvider: React.FC = ({ children }) => {
  const [modules, setModules] = useState<Module[]>([...Modules]); // setting default modules for now

  const replaceModule = (moduleId: string): [Module | undefined, Module[], number] => {
    const copyState = [...modules];
    const module = copyState.find((module) => module.id === moduleId);
    const moduleIndex = copyState.findIndex((module) => module.id === moduleId);

    return [module, copyState, moduleIndex];
  };

  const toggleModule = (moduleId: string) => {
    const [module, modules, moduleIndex] = replaceModule(moduleId);

    if (module) {
      module.display = !module.display;
      modules.splice(moduleIndex, 1, module);
      setModules(modules);
    }
  };

  const isSelected = (moduleId: string) => {
    const module = modules.find((module) => module.id === moduleId);
    if (!module) return false;
    return module.display;
  };

  const updatePosition = (moduleId: string, position: Position) => {
    const [module, modules, moduleIndex] = replaceModule(moduleId);

    if (module) {
      module.screenPos = position;
      modules.splice(moduleIndex, 1, module);
      setModules(modules);
    }
  };

  const saveModulesPos = () => {
    const copyState = [...modules];
    localStorage.setItem('modules', JSON.stringify(copyState));
  };

  useEffect(() => {
    // get existing screnPos from localStorage
  }, []);

  useEffect(() => {
    saveModulesPos();
  }, [modules]);

  return (
    <ModulesContext.Provider
      value={{
        modules,
        toggleModule,
        isSelected,
        updatePosition
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
