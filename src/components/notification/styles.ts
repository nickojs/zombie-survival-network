import styled, { css, keyframes } from 'styled-components';
import { NotificationTypes } from '../../contexts/notificationContext';

interface NotificationProps {
  display: number;
  type: NotificationTypes;
}

const fadeIn = keyframes`
  from{ 
    top: -50%;
  }to { 
    top: 5%
  }
`;

const notificationColor = (type: NotificationTypes) => {
  switch (type) {
    case NotificationTypes.SUCCESS:
      return css`
        border: 1px outset green;
        background: lightgreen;
        color: white;
      `;
    case NotificationTypes.ERROR:
      return css`
        border: 1px outset red;
        background: lightcoral;
        color: white;
      `;
    case NotificationTypes.WARNING:
      return css`
        border: 1px outset yellow;
        background: lightyellow;
        color: black;
      `;
    case NotificationTypes.DEFAULT:
      return css`
        border: 1px outset lightsalmon;
        background: white;
        color: black;
      `;
    default:
      break;
  }
};

const disabledDiv = css`
  visibility: hidden;
  opacity: 0;
`;

export const NotificationContainer = styled.div<NotificationProps>`
  position: absolute;
  top: 5%; left: 50%;
  transform: translate(-50%, -50%);

  padding: 6px 12px;
  font-weight: bold;
  animation: ${fadeIn} 1s cubic-bezier(0.23, 1, 0.320, 1);

  border-radius: 4px;

  visibility: visible;
  opacity: 1;
  transition: opacity .5s, visibility .5s;

  ${({ display }) => !display && disabledDiv};
  ${({ type }) => notificationColor(type)}
`;
