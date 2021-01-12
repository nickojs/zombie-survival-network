import React, { useEffect, useRef } from 'react';
import { ImExit } from 'react-icons/im';

import { useSurvivor } from '../../contexts/survivorContext';
import { ModulesName, useModules } from '../../contexts/modulesContext';
import { useTrade } from '../../contexts/tradeContext';

import * as S from './styles';
import { Item, ItemImage } from '../inventory/styles';

export default () => {
  const { survivor } = useSurvivor();
  const { toggleModule, modules } = useModules();
  const {
    tradeState, onAccept, onDecline, toggleTrading, onExit
  } = useTrade();
  const {
    trading, items, receivedItems, recipientAck, senderAck
  } = tradeState;
  const timer = useRef<any>();

  useEffect(() => {
    toggleTrading(true);

    return () => { toggleTrading(false); };
  }, []);

  useEffect(() => {
    if (trading) {
      const inventory = modules.find((mod) => mod.id === ModulesName.INVENTORY);
      if (!inventory?.display) toggleModule(ModulesName.INVENTORY);
    }
    if (!trading) timer.current = setTimeout(() => { toggleModule(ModulesName.TRADE); }, 100);
    return () => { clearTimeout(timer.current); };
  }, [trading]);

  return survivor && (
    <S.TradeGrid>
      <S.TradeTitle>
        <S.Title>
          Trading with:
          {' '}
          {survivor.username}
        </S.Title>
        <ImExit
          size="3em"
          onClick={onExit}
        />
      </S.TradeTitle>
      <S.YourTrade>
        <S.Text>Your offer</S.Text>
        <S.TradeItemsContainer>
          {items.map((item) => (
            <Item key={item._id}>
              <ItemImage
                alt={item.name}
                title={item.name}
                src={`data:image/png;base64,${item.icon}`}
              />
            </Item>
          ))}
        </S.TradeItemsContainer>

      </S.YourTrade>
      <S.SurvivorTrade>
        <S.Text>
          {survivor.username}
          &apos;s offer
        </S.Text>
        <S.TradeItemsContainer>
          {receivedItems.map((item) => (
            <Item key={item._id}>
              <ItemImage
                alt={item.name}
                title={item.name}
                src={`data:image/png;base64,${item.icon}`}
              />
            </Item>
          ))}
        </S.TradeItemsContainer>
        {recipientAck && (
        <p>
          {survivor.username}
          {' '}
          has accepted the trade
        </p>
        )}
      </S.SurvivorTrade>
      <S.ButtonContainer>
        <S.Button
          onClick={onAccept}
          color="lime"
        >
          {senderAck ? 'Done' : 'Accept'}
        </S.Button>
        <S.Button
          onClick={onDecline}
          color="red"
        >
          Decline
        </S.Button>
      </S.ButtonContainer>
    </S.TradeGrid>
  );
};
