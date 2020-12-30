import React, { useEffect, useState } from 'react';
import { NotificationTypes, useNotification } from '../../contexts/notificationContext';
import { Container, Title } from '../../generalStyles';
import useRequest, { Options, State } from '../../hooks/useRequest';

import * as S from './styles';
import UserPreview, { CompactUser } from './user';

export default () => {
  const [users, setUsers] = useState<CompactUser[]>();
  const [options, setOptions] = useState<Options>(null);
  const [requestData] = useRequest(options);
  const { data, error, loading } = requestData as State;
  const { messageHandler } = useNotification();

  useEffect(() => {
    setOptions({
      method: 'GET',
      url: '/user/'
    });
  }, []);

  useEffect(() => {
    if (data) setUsers(data as CompactUser[]);
  }, [data]);

  useEffect(() => {
    if (error) messageHandler(error, NotificationTypes.ERROR);
  }, [error]);

  return (
    <Container>
      <Title>Users</Title>

      <S.ListContainer>
        {loading && <p>Loading...</p>}
        {users && users.map((user: CompactUser) => (
          <UserPreview
            key={user.id}
            user={user}
          />
        )) }
      </S.ListContainer>
    </Container>
  );
};
