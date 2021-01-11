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
  toggleItem(itemId: OSRSItem): void;
}

export const TradeContext = React.createContext<TradeContextProps>(
  {} as TradeContextProps
);

export const TradeProvider: React.FC = ({ children }) => {
  const [trading, setTrading] = useState<boolean>(false);
  const [items, setItems] = useState<OSRSItem[]>([]);

  const toggleItem = (item: OSRSItem) => {
    const findItemIndex = items.findIndex((i) => i._id === item._id);

    if (findItemIndex !== -1) {
      const copyState = [...items];
      copyState.splice(findItemIndex, 1);
      return setItems(copyState);
    }

    setItems((pState) => [...pState, item]);
  };

  const toggleTrading = (value: boolean) => {
    setTrading(value);
  };

  useEffect(() => {
    //  do socket stuff here
    console.log(items);
  }, [items]);

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
