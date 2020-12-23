import styled, { keyframes } from 'styled-components';

const loading = keyframes`
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 28px 0;
  }
`;

export const LoadingBar = styled.div`
  width: 100px; height: 16px;
  margin: 0 auto;
  border: 2px solid black;
  border-radius: 4px;
  background-image: 
    repeating-linear-gradient(
      -45deg,
      black,
      black 11px,
      #FAC900 10px,
      #FAC900 20px 
    );
  background-size: 28px 28px;
  animation: ${loading} .5s linear infinite;
`;

export default LoadingBar;
