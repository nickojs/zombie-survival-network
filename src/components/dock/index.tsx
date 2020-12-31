import React, { useState } from 'react';
import { MdArrowDropUp, MdArrowDropDown } from 'react-icons/md';

import * as S from './styles';

export default () => {
  const [menu, toggleMenu] = useState<boolean>(false);

  const menuHandler = () => toggleMenu(!menu);

  return (
    <S.Footer>
      <S.ToggleButton
        role="button"
        onClick={menuHandler}
      >
        {menu ? <MdArrowDropDown /> : <MdArrowDropUp />}
      </S.ToggleButton>
      <S.FootContainer show={menu ? 1 : 0}>
        {/* minimized modules */}
      </S.FootContainer>
    </S.Footer>
  );
};
