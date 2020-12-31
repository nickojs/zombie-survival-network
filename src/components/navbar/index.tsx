import React from 'react';
import { CgProfile } from 'react-icons/cg';
import { ImExit } from 'react-icons/im';
import { useAuth } from '../../contexts/authContext';
import * as S from './styles';

export default () => {
  const { token, signOut } = useAuth();

  return (
    <S.NavbarContainer>
      <S.Title>S.N.I. - Survival Network Interface</S.Title>
      {token && (
      <S.IconButtonContainer>
        <S.IconButton>
          <CgProfile />
        </S.IconButton>
        <S.IconButton onClick={signOut}>
          <ImExit />
        </S.IconButton>
      </S.IconButtonContainer>
      )}
    </S.NavbarContainer>
  );
};
