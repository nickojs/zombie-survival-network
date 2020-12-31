import styled from 'styled-components';
import { Container, Title } from '../../generalStyles';

export const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const FootContainer = styled(Container)<{ show: number }>`
  transition: .5s;
  margin: 0;
  
  width: 100%;
  height: ${({ show }) => (show ? '90px' : '0px')};
`;

export const ToggleButton = styled(Title)`
  position: absolute;
  left: 50%; top: -25%;
  transform: translate(-50%, -50%) skew(-25deg);
  
  margin: 0; padding: 0;
  width: 15%;
  
  font-size: 2em;
  color: lime;
`;
