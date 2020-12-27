import React, { useContext, useState } from 'react';
import { CompactUser } from '../components/userList/user';

interface SurvivorContextProps {
  survivor: CompactUser | null;
  survivorHandler(survivor: CompactUser): void;
}

export const SurvivorContext = React.createContext<SurvivorContextProps>(
  {} as SurvivorContextProps
);

export const SurvivorProvider: React.FC = ({ children }) => {
  const [survivor, setSurvivor] = useState<CompactUser | null>(null);

  const survivorHandler = (survivor: CompactUser) => setSurvivor(survivor);

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
