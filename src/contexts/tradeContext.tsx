import React, { useContext, useEffect, useState } from 'react';
import { OSRSItem } from '../components/inventory';

// onAccept
// accepted
// onDecline - just send a notification if this user or the survivor declines

// survivorAccepted
// survivorDeclined

// tradeFinally - if both user accepts the trade

interface TradeContextProps {
  trading: boolean;
  toggleTrading(value?: boolean): void;

  items: OSRSItem[];
  toggleItem(itemId: string): void;
}

export const TradeContext = React.createContext<TradeContextProps>(
  {} as TradeContextProps
);

export const TradeProvider: React.FC = ({ children }) => {
  const [trading, setTrading] = useState<boolean>(false);
  const [items, setItems] = useState<OSRSItem[]>([]);

  const toggleItem = (itemId: string) => {
    // look for exisitng item to toggle
  };

  const toggleTrading = (value: boolean) => {
    setTrading(value);
  };

  return (
    <TradeContext.Provider value={{
      trading,
      items,
      toggleItem,
      toggleTrading
    }}
    >
      {children}
    </TradeContext.Provider>
  );
};

export const useTrade = () => {
  const context = useContext(TradeContext);
  return context;
};
