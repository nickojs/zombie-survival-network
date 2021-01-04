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
        {dockedModules.map((module) => (
          <S.MenuItem
            key={module.id}
            role="button"
            onClick={() => toggleModule(module.id)}
          >
            {module.id}
          </S.MenuItem>
        ))}
      </S.FootContainer>
    </S.Footer>
  );
};
