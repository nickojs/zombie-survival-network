import styled, { css } from 'styled-components';

const FlexBase = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

interface IconButtonProps {
  selected?: number
}

const defaultBtn = css`
  color: black;
  background: yellow;
  box-shadow: 2px 2px 4px black;
`;

const selectedBtn = css`
  color: lime;
  background: black;
  box-shadow: 2px 2px 4px black;
`;

export const IconButton = styled.div<IconButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 75px;
  margin: 6px;
  padding: 12px; 

  text-align: center;
  font-size: 1.5rem;

  color: black;
  background: yellow;
  box-shadow: 2px 2px 4px black;
  
  transition: .5s;
  cursor: pointer;
  
  ${({ selected }) => (selected ? selectedBtn : defaultBtn)};

  &:active { box-shadow: -2px -2px 4px black; }
`;

export const IconButtonContainer = styled(FlexBase)`
  justify-content: space-between;
`;

export const NavbarContainer = styled(FlexBase)`
  width: 100%;
  margin: 0 auto;
  padding: 12px;
  box-shadow: 0 0 10px black;
  
  background: 
    repeating-linear-gradient(135deg, 
    black, black 10%, 
    #FAC900 10%, #FAC900 20%);
`;

export const Title = styled.h1`
  color: #6ddb41;
  text-shadow: 3px 3px 0 black;
`;
