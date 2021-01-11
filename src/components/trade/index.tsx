import React from 'react';
import * as S from './styles';

export default () => (
  <S.TradeGrid>
    <S.TradeTitle>
      <S.Title>Trading with: Satan</S.Title>
    </S.TradeTitle>
    <S.YourTrade>
      <S.Text>Your offer</S.Text>
    </S.YourTrade>
    <S.SurvivorTrade>
      <S.Text>Satan&apos;s offer</S.Text>
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
