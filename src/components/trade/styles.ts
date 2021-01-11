import styled from 'styled-components';
import tradeBg from '../../assets/trade.png';

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

  background-image: url(${tradeBg});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;

  div { padding: 6px; }
`;

export const TradeTitle = styled.div`
  grid-area: trade-title;
`;

export const YourTrade = styled.div`
  grid-area: your-trade;
`;

export const InnerContainer = styled.div`
  background: #493f35;
  height: 100%;
  width: 100%;
`;

export const SurvivorTrade = styled.div`
  grid-area: survivor-trade;
`;
