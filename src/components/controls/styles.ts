import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  top: -5px; left: -5px;
  z-index: 99;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

export const Minimize = styled.button`
  width: 50px;

  cursor: pointer;
  border: 1px outset white;

  color: lime;
  background-color: black;
  transition: .2s;

  :hover { 
    color: black;
    background-color: white;
  }
`;
