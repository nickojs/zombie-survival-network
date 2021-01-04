import React, { useEffect, useState } from 'react';
import { MdArrowDropUp, MdArrowDropDown } from 'react-icons/md';
import { useModules, Module } from '../../contexts/modulesContext';

import * as S from './styles';

export default () => {
  const [menu, toggleMenu] = useState<boolean>(false);
  const [dockedModules, setDockedModules] = useState<Module[]>([]);
  const menuHandler = () => toggleMenu(!menu);

  const { modules, toggleModule } = useModules();

  useEffect(() => {
    const filterModules = modules.filter((mo) => !mo.display && mo.isDockable);
    setDockedModules(filterModules);
  }, [modules]);

  return (
    <S.Footer>
      <S.ToggleButton
        role="button"
        onClick={menuHandler}
      >
        {menu ? <MdArrowDropDown /> : <MdArrowDropUp />}
      </S.ToggleButton>
      <S.FootContainer show={menu ? 1 : 0}>
        {dockedModules.map((module) => {
          const { id } = module;
          return (
            <button
              type="button"
              key={id}
              onClick={() => toggleModule(id)}
            >
              {id}
            </button>
          );
        })}
      </S.FootContainer>
    </S.Footer>
  );
};
