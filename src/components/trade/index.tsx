import React, { useEffect } from 'react';
import { ImExit } from 'react-icons/im';
import { useSurvivor } from '../../contexts/survivorContext';
import { ModulesName, useModules } from '../../contexts/modulesContext';
import * as S from './styles';
import { useTrade } from '../../contexts/tradeContext';

export default () => {
  const { survivor } = useSurvivor();
  const { toggleModule } = useModules();
  const { trading, toggleTrading } = useTrade();

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
        <p>open your inventory and select items to trade</p>
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
