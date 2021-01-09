import styled, { css } from 'styled-components';
import inventoryBg from '../../assets/inventory.png';

export const InventoryContainer = styled.div`
  position: relative;
  height: 485px;
  width: 350px;
  
  padding: 60px 50px;
  margin: 24px;

  background-image: url(${inventoryBg});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;

export const InventoryMenu = styled.div`
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 50px;
  
  display: flex;
  flex-direction: row;
`;

export const InventoryMenuItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  
  width: 12.5%;
  padding: 4px; 
  
  font-size: 24px;
  background: white;
  border-radius: 8px;

  cursor: pointer;
`;

export const SearchBar = styled.input`
  width: 100%; 
  height: 32px;
  margin-bottom: 12px;

  text-align: center;
  
  border: 1px inset gray;
  border-radius: 4px;
  color: white;
`;

interface ItemWrapperProps {
  disabled: number;
}

const disabledDiv = css`
  pointer-events: none;
  cursor: not-allowed;
  filter: grayscale(100%);
`;

export const ItemWrapper = styled.div<ItemWrapperProps>`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  
  margin-bottom: 8px;
  
  ${({ disabled }) => disabled && disabledDiv}
`;

export const Item = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  
  width: 25%;
  height: 50px;
  cursor: pointer;

  :hover img{ filter: drop-shadow(5px 5px 8px gold); }
`;

export const ItemImage = styled.img`
  transition: .5s;
  height: 50px;
  width: 50px;
`;

interface RemoveItemProps {
  show: number;
  triggered: number;
}

const showButton = css`
  visibility: visible;
  opacity: 1;
`;

export const RemoveItem = styled.button<RemoveItemProps>`
  position: absolute;
  bottom: 0; right: 0;
  
  width: 20px;
  padding: 4px;
  
  font-size: 10px;
  text-align: center;
  
  border: 1px solid black;
  border-radius: 100%;
  
  color: black;
  background-color: ${({ triggered }) => (triggered ? 'yellow' : 'red')};
  box-shadow: 2px 2px 4px black;
  
  transition: color .3s, visibility .3s, opacity .3s;
  
  visibility: hidden;
  opacity: 0;
  cursor: pointer;
  
  ${({ show }) => show && showButton};
`;
