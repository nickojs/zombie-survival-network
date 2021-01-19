import React, { useEffect, useState } from 'react';
import { ImExit } from 'react-icons/im';

import { useSurvivor } from '../../contexts/survivorContext';
import { ModulesName, useModules } from '../../contexts/modulesContext';
import { useTrade } from '../../contexts/tradeContext';

import * as S from './styles';
import { Item, ItemImage } from '../inventory/styles';
import { useAuth } from '../../contexts/authContext';
import { INVENTORY_SPACE, Modules } from '../../constant';

export default () => {
  const [spaces, setSpaces] = useState<number>(0);
  const [allowTrade, setAllowTrade] = useState<boolean>(false);

  const { survivor } = useSurvivor();
  const { user } = useAuth();
  const { toggleModule, modules } = useModules();
  const { inventory } = modules;
  const {
    tradeState, onAccept, onDecline, onExit
  } = useTrade();
  const {
    trading, items, receivedItems, recipientAck, senderAck, recipientAvailable
  } = tradeState;

  useEffect(() => {
    if (user && user.items) {
      const tradeDiff = user.items.length - items.length + receivedItems.length - INVENTORY_SPACE;
      setSpaces(tradeDiff);
    }
  }, [user, items, receivedItems]);

  useEffect(() => {
    setAllowTrade(spaces < 1);
  }, [spaces]);

  return survivor && (
    <S.TradeGrid disabled={!recipientAvailable ? 1 : 0}>
      <S.TradeTitle>
        <S.Title>
          {recipientAvailable
            ? `Trading with: ${survivor.username}`
            : `Waiting ${survivor.username} to connect...`}
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
            <Item key={item.id}>
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
            <Item key={item.id}>
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
        <S.InventoryData>
          {allowTrade ? (
            <p>
              {spaces === 0 ? 'no' : Math.abs(spaces)}
              {' '}
              inventory space remaining
            </p>
          ) : (
            <p>Plase free inventory spaces</p>
          )}
        </S.InventoryData>
        <S.Button
          disabled={!allowTrade}
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
