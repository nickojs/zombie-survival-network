import React from 'react';
import { CgProfile } from 'react-icons/cg';
import { ImExit } from 'react-icons/im';
import { MdGpsFixed } from 'react-icons/md';
import { AiOutlineSave } from 'react-icons/ai';
import { GiLightBackpack } from 'react-icons/gi';

import { useAuth } from '../../contexts/authContext';
import { ModulesName, useModules } from '../../contexts/modulesContext';

import * as S from './styles';

export default () => {
  const { token, signOut } = useAuth();
  const {
    toggleModule, isSelected, uploadModulesPos, loading
  } = useModules();

  return (
    <S.NavbarContainer>
      <S.Title>S.N.I. - Survival Network Interface</S.Title>
      {token && (
      <S.IconButtonContainer>
        <S.IconButton
          selected={isSelected(ModulesName.PROFILE) ? 1 : 0}
          onClick={() => toggleModule(ModulesName.PROFILE)}
          title="Open Profile panel"
        >
          <CgProfile />
        </S.IconButton>
        <S.IconButton
          selected={isSelected(ModulesName.LOCATION) ? 1 : 0}
          onClick={() => toggleModule(ModulesName.LOCATION)}
          title="Open Location panel"
        >
          <MdGpsFixed />
        </S.IconButton>
        <S.IconButton
          selected={loading ? 1 : 0}
          onClick={uploadModulesPos}
          title="Save containers current position"
        >
          <AiOutlineSave />
        </S.IconButton>
        <S.IconButton
          selected={isSelected(ModulesName.INVENTORY) ? 1 : 0}
          onClick={() => toggleModule(ModulesName.INVENTORY)}
          title="Inventory"
        >
          <GiLightBackpack />
        </S.IconButton>
        <S.IconButton
          onClick={signOut}
          title="Exit the application"
        >
          <ImExit />
        </S.IconButton>
      </S.IconButtonContainer>
      )}
    </S.NavbarContainer>
  );
};
