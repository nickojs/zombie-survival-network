import React from 'react';
import { useAuth } from '../../contexts/authContext';
import { Container, Title } from '../../generalStyles';

export default () => {
  const { user } = useAuth();
  const { items } = user || { };

  return (
    <Container>
      <Title>Inventory</Title>
      {items && items.map((item) => <p>{item.OSRSId}</p>)}
      <p>items</p>
      <p>items</p>
      <p>items</p>
      <p>items</p>
    </Container>
  );
};
