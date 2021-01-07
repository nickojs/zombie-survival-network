import styled from 'styled-components';

export const Minimize = styled.button`
  position: absolute;
  top: -5px; left: -5px;
  
  z-index: 99;
  width: 75px;

  cursor: pointer;
  border: 1px outset white;

  color: lime;
  background-color: black;
  transition: .5s ease-in;

  :hover { 
    color: black;
    background-color: white;
  }
`;
