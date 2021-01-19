/* eslint-disable react/require-default-props */
import React from 'react';
import { MdArrowDropDown } from 'react-icons/md';
import { IoCloseOutline } from 'react-icons/io5';
import { BiMove } from 'react-icons/bi';
import { ModulesName, useModules } from '../../contexts/modulesContext';
import * as S from './styles';
import { useDrag } from '../../contexts/dragContext';

type ModuleName = ModulesName;

interface ControlsProps {
  moduleName: ModuleName;
  online?: boolean;
  close?: () => void;
}

export default ({ moduleName, close, online }: ControlsProps) => {
  const { toggleModule } = useModules();
  const { toggleDrag } = useDrag();

  return (
    <S.Container>
      <div>
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
      </div>
      <S.Move
        onMouseEnter={toggleDrag}
        onMouseLeave={toggleDrag}
      >
        <BiMove />
      </S.Move>
      {online && (
        <S.Online
          title="Status"
        >
          online
        </S.Online>
      )}
    </S.Container>
  );
};
