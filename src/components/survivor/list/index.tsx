import React, { useEffect, useState } from 'react';

import { Container, Title } from '../../../generalStyles';
import { Survivor, useSurvivor } from '../../../contexts/survivorContext';
import Minimize from '../../../components/controls';
import SurvivorPreview from './survivor';

import * as S from './styles';

export default () => {
  const [localSurvivors, setLocalSurvivors] = useState<Survivor[]>();
  const { survivorList } = useSurvivor();

  useEffect(() => {
    setLocalSurvivors(survivorList);
  }, [survivorList]);

  return (
    <Container>
      <Minimize moduleName="survivorList" />
      <Title>Survivors</Title>
      <p>Displays only active, full profile users</p>

      <S.ListContainer>
        {localSurvivors && localSurvivors.map((user: Survivor) => (
          <SurvivorPreview
            key={user.id}
            user={user}
          />
        )) }
      </S.ListContainer>
    </Container>
  );
};
