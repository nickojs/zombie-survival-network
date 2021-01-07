import React from 'react';
import { MdArrowDropDown } from 'react-icons/md';
import { IoCloseOutline } from 'react-icons/io5';
import { useModules } from '../../contexts/modulesContext';
import * as S from './styles';

interface ControlsProps {
  moduleName: string;
  // eslint-disable-next-line react/require-default-props
  close?: () => void;
}

export default ({ moduleName, close }: ControlsProps) => {
  const { toggleModule } = useModules();

  return (
    <S.Container>
      <S.Minimize
        type="button"
        title="Dock this window"
        onClick={() => toggleModule(moduleName)}
      >
        <MdArrowDropDown />
      </S.Minimize>
      {close && (
        <S.Minimize
          type="button"
          title="Close this window"
          onClick={close}
        >
          <IoCloseOutline />
        </S.Minimize>
      )}
    </S.Container>
  );
};
