import React, { useEffect, useState } from 'react';

import useRequest, { Options, State } from '../../../hooks/useRequest';
import { NotificationTypes, useNotification } from '../../../contexts/notificationContext';
import { useSurvivor, Survivor } from '../../../contexts/survivorContext';

import * as S from './styles';

interface UserPreviewProps {
  user: Survivor;
}

export default ({ user }: UserPreviewProps) => {
  const [options, setOptions] = useState<Options>(null);
  const [requestData] = useRequest(options);
  const { data, error } = requestData as State;

  const { messageHandler } = useNotification();
  const { profile, flags } = user;

  const { survivorHandler, survivor } = useSurvivor();

  const fetchSurvivor = () => {
    setOptions({
      method: 'GET',
      url: `/user/${user.id}`
    });
  };

  useEffect(() => {
    if (data) survivorHandler(data as Survivor);
  }, [data]);

  useEffect(() => {
    if (error) messageHandler(error, NotificationTypes.ERROR);
  }, [error]);

  return profile && (
    <S.SurvivorCard
      infected={flags && flags.length >= 1 ? 1 : 0}
      select={survivor?.id === user.id ? 1 : 0}
      onClick={fetchSurvivor}
    >
      <S.SubCard>
        <p>{profile.fullName}</p>
        <p>
          {profile.age}
          y/o
        </p>
        <S.GenderIcon gender={profile.gender} />
      </S.SubCard>
    </S.SurvivorCard>
  );
};
