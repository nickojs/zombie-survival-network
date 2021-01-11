import styled from 'styled-components';

export const TradeGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 0.3fr 1.3fr 1.4fr;
  gap: 0px 0px;
  grid-template-areas:
    "trade-title trade-title trade-title trade-title"
    "your-trade your-trade survivor-trade survivor-trade"
    "your-trade your-trade survivor-trade survivor-trade";
  
  height: 395px;
  width: 630px;
  
  border: 4px outset #534f3e;
  box-shadow: 1px 1px 10px black;

  color: #ff981f;

  div { 
    padding: 6px; 
    text-align: center;
  }

  * {
    font-size: 12px;
    font-family: 'Press Start 2P', cursive;
  }

`;

const Container = styled.div`
  background: #493f35;
  height: 100%;
  width: 100%;
  
  border: 4px inset #5d5647;
  box-shadow: inset 0 0 10px black;
`;

export const TradeTitle = styled(Container)`
  grid-area: trade-title;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const YourTrade = styled(Container)`
  grid-area: your-trade;
`;

export const SurvivorTrade = styled(Container)`
  grid-area: survivor-trade;
`;

export const ButtonContainer = styled.div`
  position: absolute;
  top: 40%; left: 50%;
  transform: translate(-50%, 0%);

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  height: 160px;
`;

interface ButtonProps {
  color: 'red' | 'lime'
}

export const Button = styled.button<ButtonProps>`
  width: 115px;
  height: 60px;
  padding: 8px;

  text-align: center;
  border: 8px double #534f3e;
  
  cursor: pointer;

  color: ${({ color }) => color};
  background: black;
`;

export const Text = styled.p`
  text-shadow: 2px 2px black;
`;

export const Title = styled.h1`
  font-size: 1.4em;
  font-weight: bold;
  
  text-shadow: 2px 2px black;  
`;

export const TradeItemsContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-content: flex-start;

  overflow-y: auto;
  height: 250px;
  width: 250px;

  pointer-events: none;
`;
