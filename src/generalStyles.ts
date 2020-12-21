import styled, { css } from 'styled-components';

const mainGradient = css`
  background: repeating-linear-gradient(45deg, 
    rgba(250, 201, 0, 0.4) 0px,
    rgba(250, 201, 0, 0.4) 20px, 
    rgba(0, 0, 0, 0.4) 20px, 
    rgba(0, 0, 0, 0.4) 40px);
`;

const secondaryGradient = css`
  background: repeating-linear-gradient(45deg, 
    rgba(21, 21, 21, 0.4) 0px,
    rgba(21, 21, 21, 0.4) 20px, 
    rgba(0, 0, 0, 0.4) 20px, 
    rgba(0, 0, 0, 0.4) 40px);
`;

export enum Gradient {
  MAIN, SECONDARY
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 350px;
  @media(max-width: 450px){
    width: 300px;
  }
  padding: 6px;
  max-height: 550px;
  margin: 24px;
  
  border: 3px outset black;
  box-sizing: border-box;
  
  color: white;
  background: #696F7A;
`;

export const Button = styled.button`
  width: 100%;
  padding: 6px;
  margin: 6px auto;
  box-sizing: border-box;
  color: white;
  font-weight: bold;
  text-align: center; 
  
  border: 1px outset white;
  border-radius: 4px;
  ${({ gradient }: { gradient: Gradient }) => (
    // eslint-disable-next-line no-nested-ternary
    gradient === Gradient.MAIN
      ? mainGradient
      : gradient === Gradient.SECONDARY
        ? secondaryGradient
        : 'background-color: grey;'
  )};

  cursor: pointer;
`;

export const Title = styled.h2`
  padding: 12px;
  width: 100%;

  @media(max-width: 450px){
    transform: skew(0deg);
  }

  transform: skew(-25deg);
  text-align: center;

  border: 3px outset black;
  color: white;
  background: #151515;
  user-select: none;
`;

export const AnimatedTitle = styled(Title)`
  width: 100%;
  cursor: pointer;
  transition: .3s;
  
  :hover{
    color: white;
    background: black;
  }
`;

export const Block = styled.div`
  border: 1px solid grey;
  margin: 6px;
  padding: 6px;
  min-width: 300px;
  display: inherit;
  flex-direction: column;
  box-sizing: border-box;
`;

export const FullWidth = styled.div`
  width: 100%;
`;

export const ToggleDiv = styled.div`
  display: ${({ show }: { show: boolean }) => (show ? 'block' : 'none')};
`;
