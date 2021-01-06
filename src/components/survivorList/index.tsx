import React, { useEffect, useState } from 'react';
import { NotificationTypes, useNotification } from '../../contexts/notificationContext';
import useRequest, { Options, State } from '../../hooks/useRequest';
import { UserProfile } from '../../models/user';

import * as S from './styles';
import { Container, Title } from '../../generalStyles';
import SurvivorPreview from './survivor';
import { useModules } from '../../contexts/modulesContext';

export interface CompactUser {
  id: string;
  profile: UserProfile;
}

export default () => {
  const [users, setUsers] = useState<CompactUser[]>();
  const [options, setOptions] = useState<Options>(null);
  const [requestData] = useRequest(options);
  const { data, error, loading } = requestData as State;
  const { messageHandler } = useNotification();
  const { toggleModule } = useModules();

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
      <Title
        onClick={() => toggleModule('survivorList')}
      >
        Survivors
      </Title>
      <p>Displays only active, full profile users</p>

      <S.ListContainer>
        {loading && <p>Loading...</p>}
        {users && users.map((user: CompactUser) => (
          <SurvivorPreview
            key={user.id}
            user={user}
          />
        )) }
      </S.ListContainer>
    </Container>
  );
};
