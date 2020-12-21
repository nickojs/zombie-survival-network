import React from 'react';
import * as S from './styles';

interface MovingTextProps {
  text: string
}

export default ({ text }: MovingTextProps) => (
  <S.TitleContainer>
    <S.Text>
      {text}
    </S.Text>
  </S.TitleContainer>
);
