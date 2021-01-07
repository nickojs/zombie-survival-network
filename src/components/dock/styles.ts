import styled from 'styled-components';
import { Container, Title } from '../../generalStyles';

export const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const FootContainer = styled(Container)<{ show: number }>`
  display: flex;
  justify-content: flex-start;
  flex-flow: row wrap;

  margin: 0;
  width: 100%;
  height: ${({ show }) => (show ? '90px' : '0px')};

  transition: .5s;
`;

export const ToggleButton = styled(Title)`
  position: absolute;
  left: 50%; top: -25%;
  transform: translate(-50%, -50%) skew(-25deg);
  z-index: 100;
  margin: 0; padding: 0;
  width: 15%;
  
  font-size: 2em;
  color: lime;
`;

export const MenuItem = styled(Title)`
  width: 25%;
  margin: 12px; 

  color: lime;
  transition: .5s;

  cursor: pointer;

  :hover{ 
    color: white;
  }

  :active {
    border: 1px inset grey;
  }
`;
