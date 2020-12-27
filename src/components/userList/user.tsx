import React from 'react';
import { User } from '../../contexts/authContext';
import * as S from './styles';

interface UserPreviewProps {
  user: User;
}

export default ({ user }: UserPreviewProps) => {
  const { profile } = user;

  return profile && (
    <S.SurvivorCard
      infected={0}
      onClick={() => console.log(user)}
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
