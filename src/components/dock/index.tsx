import React, { useState } from 'react';
import { MdArrowDropUp, MdArrowDropDown } from 'react-icons/md';
import { useModules } from '../../contexts/modulesContext';

import * as S from './styles';

export default () => {
  const [menu, toggleMenu] = useState<boolean>(false);
  const menuHandler = () => toggleMenu(!menu);

  const { modules, toggleModule } = useModules();

  return (
    <S.Footer>
      <S.ToggleButton
        role="button"
        onClick={menuHandler}
      >
        {menu ? <MdArrowDropDown /> : <MdArrowDropUp />}
      </S.ToggleButton>
      <S.FootContainer show={menu ? 1 : 0}>
        {(Object.keys(modules) as Array<keyof typeof modules>).map((key) => {
          const mod = modules[key];
          const testMod = !mod.display && mod.isDockable;

          return testMod && (
            <S.MenuItem
              key={key}
              role="button"
              onClick={() => toggleModule(key)}
            >
              {mod.name}
            </S.MenuItem>
          );
        })}

      </S.FootContainer>
    </S.Footer>
  );
};
