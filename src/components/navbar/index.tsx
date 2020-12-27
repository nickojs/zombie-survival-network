import React from 'react';
import { Link } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { ImExit } from 'react-icons/im';
import { useAuth } from '../../contexts/authContext';
import * as S from './styles';

export default () => {
  const { token, signOut } = useAuth();

  return (
    <S.NavbarContainer>
      <Link to="/">
        <S.Title>S.N.I. - Survival Network Interface</S.Title>
      </Link>
      {token && (
      <S.IconButtonContainer>
        <Link to="/user-profile">
          <S.IconButton>
            <CgProfile />
          </S.IconButton>
        </Link>
        <S.IconButton onClick={signOut}>
          <ImExit />
        </S.IconButton>
      </S.IconButtonContainer>
      )}
    </S.NavbarContainer>
  );
};
