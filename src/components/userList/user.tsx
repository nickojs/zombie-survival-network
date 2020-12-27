import React, { useEffect, useState } from 'react';
import { UserProfile } from '../../contexts/authContext';
import { NotificationTypes, useNotification } from '../../contexts/notificationContext';
import useRequest, { Options, State } from '../../hooks/useRequest';
import * as S from './styles';

export interface CompactUser {
  id: string;
  username?: string;
  profile: UserProfile;
}
interface UserPreviewProps {
  user: CompactUser;
}

export default ({ user }: UserPreviewProps) => {
  const [options, setOptions] = useState<Options>(null);
  const [requestData] = useRequest(options);
  const { data, error, loading } = requestData as State;

  const { messageHandler } = useNotification();
  const { profile } = user;

  const fetchSelectedSurvivor = () => {
    setOptions({
      method: 'GET',
      url: `/user/${user.id}`
    });
  };

  useEffect(() => {
    if (data) console.log(data); // send to survivorContext
  }, [data]);

  useEffect(() => {
    if (error) messageHandler(error, NotificationTypes.ERROR);
  }, [error]);

  return profile && (
    <S.SurvivorCard
      infected={0}
      onClick={fetchSelectedSurvivor}
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
