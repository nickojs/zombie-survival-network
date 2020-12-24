import styled, { keyframes } from 'styled-components';

interface NotificationProps {
  color?: string;
  display: number;
}

const fadeIn = keyframes`
  from{ 
    top: -50%;
  }to { 
    top: 5%
  }
`;

export const NotificationContainer = styled.div<NotificationProps>`
  position: absolute;
  top: 5%; left: 50%;
  transform: translate(-50%, -50%);
  display: ${({ display }) => (display ? 'block' : 'none')};

  padding: 6px 12px;
  font-weight: bold;

  animation: ${fadeIn} 1s cubic-bezier(0.23, 1, 0.320, 1);

  border-radius: 4px;
  border: 1px outset lightgreen;

  color: white;
  background: green;
`;
