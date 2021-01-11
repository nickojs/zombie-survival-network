import React, { useEffect } from 'react';
import { ImExit } from 'react-icons/im';

import { useSurvivor } from '../../contexts/survivorContext';
import { ModulesName, useModules } from '../../contexts/modulesContext';
import { useTrade } from '../../contexts/tradeContext';

import * as S from './styles';
import { Item, ItemImage } from '../inventory/styles';

export default () => {
  const { survivor } = useSurvivor();
  const { toggleModule } = useModules();
  const { trading, items, toggleTrading } = useTrade();

  useEffect(() => {
    toggleTrading(true);

    return () => { toggleTrading(false); };
  }, []);

  useEffect(() => {
    if (trading) toggleModule(ModulesName.INVENTORY);
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
          onClick={() => toggleModule(ModulesName.TRADE)}
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
      </S.SurvivorTrade>
      <S.ButtonContainer>
        <S.Button color="lime">
          Accept
        </S.Button>
        <S.Button color="red">
          Decline
        </S.Button>
      </S.ButtonContainer>
    </S.TradeGrid>
  );
};
