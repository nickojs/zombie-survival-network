import React, { useContext, useEffect, useReducer } from 'react';
import { OSRSItem } from '../components/inventory';
import { SocketEvents, useSocket } from './socketContext';
import { useSurvivor } from './survivorContext';

interface TradeState {
  trading: boolean;

  items: OSRSItem[];
  receivedItems: OSRSItem[];

  senderAck: boolean;
  recipientAck: boolean;
}

interface TradeContextProps {
  toggleTrading(value?: boolean): void;
  toggleItem(itemId: OSRSItem): void;

  onAccept(): void;
  onDecline(): void;

  tradeState: TradeState;
}

export const TradeContext = React.createContext<TradeContextProps>(
  {} as TradeContextProps
);

enum ActionTypes {
  TRADING = 'TRADING',
  ITEMS = 'ITEMS',
  RECEIVEDITEMS = 'RECEIVEDITEMS',
  SENDERACK = 'SENDERACK',
  RECIPIENTACK = 'RECIPIENTACK',
  RESET = 'RESET'
}

type Actions =
  | { type: ActionTypes.TRADING, status: boolean }
  | { type: ActionTypes.ITEMS, data: OSRSItem[] }
  | { type: ActionTypes.RECEIVEDITEMS, data: OSRSItem[] }
  | { type: ActionTypes.SENDERACK, status: boolean }
  | { type: ActionTypes.RECIPIENTACK, status: boolean }
  | { type: ActionTypes.RECIPIENTACK, status: boolean }
  | { type: ActionTypes.RESET }

const initialState = {
  trading: false,
  items: [],
  receivedItems: [],
  senderAck: false,
  recipientAck: false
};

const tradeReducer = (state: TradeState, action: Actions) => {
  switch (action.type) {
    case ActionTypes.TRADING:
      return {
        ...state,
        trading: action.status
      };
    case ActionTypes.ITEMS:
      return {
        ...state,
        items: action.data
      };
    case ActionTypes.RECEIVEDITEMS:
      return {
        ...state,
        receivedItems: action.data
      };
    case ActionTypes.SENDERACK:
      return {
        ...state,
        senderAck: action.status
      };
    case ActionTypes.RECIPIENTACK:
      return {
        ...state,
        recipientAck: action.status
      };
    case ActionTypes.RESET:
      return initialState;
    default:
      throw new Error(`[tradeContext] Unknown action: ${action}`);
  }
};

export const TradeProvider: React.FC = ({ children }) => {
  const [tradeState, dispatch] = useReducer(tradeReducer, initialState);

  const { items } = tradeState;
  const { survivor } = useSurvivor();
  const { emitEvent, onEvent } = useSocket();

  const toggleItem = (item: OSRSItem) => {
    const findItemIndex = items.findIndex((i) => i._id === item._id);

    if (findItemIndex !== -1) {
      const copyState = [...items];
      copyState.splice(findItemIndex, 1);
      return dispatch({ type: ActionTypes.ITEMS, data: copyState });
    }
    return dispatch({ type: ActionTypes.ITEMS, data: [...items, item] });
  };

  const toggleTrading = (value: boolean) => {
    dispatch({ type: ActionTypes.TRADING, status: value });
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
      dispatch({ type: ActionTypes.RECEIVEDITEMS, data });
    });
    onEvent(SocketEvents.SENDER_ACKNOWLEDGE, () => {
      dispatch({ type: ActionTypes.SENDERACK, status: true });
    });
    onEvent(SocketEvents.RECIPIENT_ACKNOWLEDGE, () => {
      dispatch({ type: ActionTypes.RECIPIENTACK, status: true });
    });
    onEvent(SocketEvents.DECLINE_TRADE, () => {
      dispatch({ type: ActionTypes.RESET });
    });
  }, []);

  return (
    <TradeContext.Provider value={{
      tradeState,
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
