import styled from 'styled-components';
import inventoryBg from '../../assets/inventory.png';

export const InventoryContainer = styled.div`
  position: relative;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;

  height: 485px;
  width: 350px;
  
  padding: 60px 50px;
  margin: 24px; margin-top: -24px;

  background-image: url(${inventoryBg});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
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
