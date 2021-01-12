import React, { useContext, useEffect, useState } from 'react';
import { OSRSItem } from '../components/inventory';
import { useModules, ModulesName } from './modulesContext';
import { SocketEvents, useSocket } from './socketContext';
import { useSurvivor } from './survivorContext';

interface TradeContextProps {
  trading: boolean;
  toggleTrading(value?: boolean): void;

  items: OSRSItem[];
  receivedItems: OSRSItem[];
  toggleItem(itemId: OSRSItem): void;

  onAccept(): void;
  onDecline(): void;

  senderAck: boolean;
  recipientAck: boolean;
}

export const TradeContext = React.createContext<TradeContextProps>(
  {} as TradeContextProps
);

export const TradeProvider: React.FC = ({ children }) => {
  const [trading, setTrading] = useState<boolean>(false);
  const [items, setItems] = useState<OSRSItem[]>([]);
  const [receivedItems, setReceivedItems] = useState<OSRSItem[]>([]);
  const [senderAck, setSenderAck] = useState<boolean>(false);
  const [recipientAck, setRecipientAck] = useState<boolean>(false);

  const { survivor } = useSurvivor();
  const { emitEvent, onEvent } = useSocket();
  const { toggleModule } = useModules();

  const resetTradeState = () => {
    setTrading(false);
    setItems([]);
    setReceivedItems([]);
    setSenderAck(false);
    setRecipientAck(false);
    toggleModule(ModulesName.TRADE);
  };

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

  const onAccept = () => {
    emitEvent(SocketEvents.ACCEPT_TRADE, { survivor });
  };

  const onDecline = () => {
    emitEvent(SocketEvents.DECLINE_TRADE, { survivor });
  };

  useEffect(() => {
    if (survivor) {
      emitEvent(SocketEvents.SEND_ITEMS, { items, survivor });
    }
  }, [items]);

  useEffect(() => {
    onEvent(SocketEvents.DELIVER_ITEMS, (data: OSRSItem[]) => {
      setReceivedItems(data);
    });
    onEvent(SocketEvents.SENDER_ACKNOWLEDGE, () => {
      setSenderAck(true);
    });
    onEvent(SocketEvents.RECIPIENT_ACKNOWLEDGE, () => {
      setRecipientAck(true);
    });
    onEvent(SocketEvents.DECLINE_TRADE, () => {
      resetTradeState();
    });
  }, []);

  return (
    <TradeContext.Provider value={{
      trading,
      items,
      receivedItems,
      senderAck,
      recipientAck,
      toggleItem,
      toggleTrading,
      onAccept,
      onDecline
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
