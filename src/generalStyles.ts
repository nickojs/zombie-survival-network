import styled from 'styled-components';

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
  
  border: 3px outset black;
  box-sizing: border-box;
  
  color: white;
  background: #696F7A;
`;

export const Title = styled.h2`
  padding: 12px;
  width: 250px;

  @media(max-width: 450px){
    width: 200px;
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
  display: ${({ show }: { show: boolean }) => show ? 'block' : 'none'};
`;