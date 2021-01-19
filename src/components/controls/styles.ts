import styled, { css } from 'styled-components';

export const Container = styled.div`
  position: absolute;
  top: -5px; left: -5px; right: -5px;
  z-index: 99;

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  text-align: center;
`;

const buttonBase = css`
  width: 50px;

  cursor: pointer;
  border: 1px outset white;

  color: lime;
  background-color: black;
  transition: .2s;
`;

export const Minimize = styled.button`
  ${buttonBase}

  :hover { 
    color: black;
    background-color: white;
  }
`;

export const Move = styled.div`
  ${buttonBase}
  width: 150px;
  cursor: move;
`;

export const Online = styled.div`
  ${buttonBase}
  width: 70px;
`;
