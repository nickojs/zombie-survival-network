import React from 'react';
import { useModules } from '../../contexts/modulesContext';
import { useSurvivor } from '../../contexts/survivorContext';
import { Block, Container, Title } from '../../generalStyles';

export default () => {
  const { survivor } = useSurvivor();
  const { toggleModule } = useModules();

  return survivor && (
    <Container>
      <Title
        onClick={() => toggleModule('survivor')}
      >
        {survivor?.profile.fullName.split(' ')[0] || survivor.username}
        &apos;s details
      </Title>
      <Block>
        <p>there will be details here, eventually</p>
      </Block>
    </Container>
  );
};
