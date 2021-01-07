import React from 'react';
import { MdArrowDropDown } from 'react-icons/md';
import { useModules } from '../../contexts/modulesContext';
import * as S from './styles';

interface ControlsProps {
  moduleName: string;
}

export default ({ moduleName }: ControlsProps) => {
  const { toggleModule } = useModules();

  return (
    <S.Minimize
      type="button"
      title="Dock this window"
      onClick={() => toggleModule(moduleName)}
    >
      <MdArrowDropDown size="1.5em" />
    </S.Minimize>
  );
};
