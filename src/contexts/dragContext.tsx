import React, { useContext, useState } from 'react';

interface DragContextProps {
  drag: boolean;
  toggleDrag(): void;
}

export const DragContext = React.createContext<DragContextProps>(
  {} as DragContextProps
);

export const DragProvider: React.FC = ({ children }) => {
  const [drag, setDrag] = useState<boolean>(false);

  const toggleDrag = () => setDrag(!drag);

  return (
    <DragContext.Provider
      value={{
        drag,
        toggleDrag
      }}
    >
      {children}
    </DragContext.Provider>
  );
};

export const useDrag = () => {
  const context = useContext(DragContext);
  return context;
};
