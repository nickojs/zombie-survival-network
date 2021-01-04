import React from 'react';
import { CgProfile } from 'react-icons/cg';
import { ImExit } from 'react-icons/im';
import { MdGpsFixed } from 'react-icons/md';

import { useAuth } from '../../contexts/authContext';
import { useModules } from '../../contexts/modulesContext';
import * as S from './styles';

export default () => {
  const { token, signOut } = useAuth();
  const { toggleModule, isSelected } = useModules();

  return (
    <S.NavbarContainer>
      <S.Title>S.N.I. - Survival Network Interface</S.Title>
      {token && (
      <S.IconButtonContainer>
        <S.IconButton
          selected={isSelected('profile') ? 1 : 0}
          onClick={() => toggleModule('profile')}
        >
          <CgProfile />
        </S.IconButton>
        <S.IconButton
          selected={isSelected('location') ? 1 : 0}
          onClick={() => toggleModule('location')}
        >
          <MdGpsFixed />
        </S.IconButton>
        <S.IconButton onClick={signOut}>
          <ImExit />
        </S.IconButton>
      </S.IconButtonContainer>
      )}
    </S.NavbarContainer>
  );
};
