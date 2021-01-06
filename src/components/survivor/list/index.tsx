import React, { useEffect, useState } from 'react';

import * as S from './styles';
import { Container, Title } from '../../../generalStyles';
import SurvivorPreview from './survivor';
import { useModules } from '../../../contexts/modulesContext';
import { Survivor, useSurvivor } from '../../../contexts/survivorContext';

export default () => {
  const [localSurvivors, setLocalSurvivors] = useState<Survivor[]>();
  const { survivorList } = useSurvivor();
  const { toggleModule } = useModules();

  useEffect(() => {
    setLocalSurvivors(survivorList);
  }, [survivorList]);

  return (
    <Container>
      <Title
        onClick={() => toggleModule('survivorList')}
      >
        Survivors
      </Title>
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
