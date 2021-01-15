import React from 'react';

import { Container, Title } from '../../../generalStyles';
import { Survivor, useSurvivor } from '../../../contexts/survivorContext';
import Minimize from '../../../components/controls';
import SurvivorPreview from './survivor';

import * as S from './styles';
import { ModulesName } from '../../../contexts/modulesContext';

export default () => {
  const { survivorList } = useSurvivor();

  return (
    <Container>
      <Minimize moduleName={ModulesName.SURVIVORLIST} />
      <Title>Survivors</Title>
      <p>Displays only activated profiles</p>

      <S.ListContainer>
        {survivorList.map((user: Survivor) => (
          <SurvivorPreview
            key={user.id}
            user={user}
          />
        )) }
      </S.ListContainer>
    </Container>
  );
};
