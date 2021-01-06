import React, { useContext, useState } from 'react';
import { User, UserProfile } from '../models/user';

export interface Survivor extends User {
  profile: UserProfile;
}

interface SurvivorContextProps {
  survivor: Survivor | null;
  survivorHandler(survivor: Survivor): void;
}

export const SurvivorContext = React.createContext<SurvivorContextProps>(
  {} as SurvivorContextProps
);

export const SurvivorProvider: React.FC = ({ children }) => {
  const [survivor, setSurvivor] = useState<Survivor | null>(null);

  const survivorHandler = (survivor: Survivor) => setSurvivor(survivor);

  return (
    <SurvivorContext.Provider
      value={{
        survivor,
        survivorHandler
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
