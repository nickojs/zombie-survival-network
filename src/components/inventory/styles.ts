import styled, { css } from 'styled-components';
import inventoryBg from '../../assets/inventory.png';

interface TradeGridProps {
  disabled: number;
}

const disabledGrid = css`
  pointer-events: none;
  cursor: not-allowed;
`;

export const InventoryContainer = styled.div<TradeGridProps>`
  position: relative;
  height: 485px;
  width: 350px;
  
  padding: 60px 50px;
  margin: 24px;

  filter: drop-shadow(5px 5px 5px black);

  ${({ disabled }) => disabled && disabledGrid};

  background-image: url(${inventoryBg});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;

export const InventoryMenu = styled.div`
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 50px;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-template-areas:
    "search . . about . . . move";
  
  div { 
    display: flex;
    align-items: center;
    justify-content: center;
    
    font-size: 24px;
    :not(:last-child){
      cursor: pointer;
    }
  }
`;

export const InventoryMenuSearch = styled.div`grid-area: search;`;
export const InventoryMenuAbout = styled.div`grid-area: about;`;
export const InventoryMenuMove = styled.div`grid-area: move;`;

export const InventoryMenuItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  
  width: 12.5%;
  padding: 4px; 
  
  font-size: 24px;
  color: #2e2c25;
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

const tradingItem = css`
  filter: drop-shadow(5px 5px 8px white);
`;

export const ItemWrapper = styled.div<ItemWrapperProps>`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  
  margin-bottom: 8px;
  
  ${({ disabled }) => disabled && disabledDiv}
`;

interface ItemProps {
  itemIsOnTrade?: number;
}

export const Item = styled.div<ItemProps>`
  position: relative;
  display: flex;
  justify-content: center;
  
  width: 25%;
  height: 50px;
  cursor: pointer;

  transition: .2s ease;

  :hover img{ filter: ${({ itemIsOnTrade }) => !itemIsOnTrade && 'drop-shadow(5px 5px 8px gold)'} }

  ${({ itemIsOnTrade }) => itemIsOnTrade && tradingItem};
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
