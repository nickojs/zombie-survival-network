import styled from 'styled-components';
import male from '../../assets/male.png';
import female from '../../assets/female.png';

import { Gender } from '../../contexts/authContext';

interface UserPreviewProps {
  infected: number;
}

interface GenderProps {
  gender: Gender;
}

export const SurvivorCard = styled.div<UserPreviewProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  width: 80%;
  height: 90px;
  padding: 6px;
  margin: 6px auto;

  cursor: pointer;
  transition: .5s; 
  
  background: repeating-linear-gradient(${({ infected }) => (infected ? '45deg' : '135deg')}, 
  ${({ infected }) => (infected
    ? `rgba(250, 201, 0, 0.4) 0px,
     rgba(250, 201, 0, 0.4) 20px, 
     rgba(0, 0, 0, 0.4) 20px, 
     rgba(0, 0, 0, 0.4) 40px`
    : `rgba(21, 21, 21, 0.4) 0px,
     rgba(21, 21, 21, 0.4) 20px, 
     rgba(0, 0, 0, 0.4) 20px, 
     rgba(0, 0, 0, 0.4) 40px`)
});

  :hover{
    background-color: rgba(255, 255, 255, 0.6);
  }
`;

export const SubCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  p{
    flex: 1;
    text-shadow: 0 0 4px black; 
    color: white;
    text-align: center;
  }
`;

export const GenderIcon = styled.div<GenderProps>`
  width: 40px;
  height: 40px;
  background: url(${({ gender }) => (gender === Gender.FEMALE ? female : male)});
  background-size: contain;
  background-repeat: no-repeat;
`;

export const ListContainer = styled.div`
  max-height: 500px; 
  overflow-y: scroll; 
  margin: 12px; 
  width: 100%;
`;
