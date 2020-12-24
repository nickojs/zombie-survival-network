import React from 'react';
import { useNotification } from '../../contexts/notificationContext';
import * as S from './styles';

export default () => {
  const { notification, dismissNotification, type } = useNotification();

  return (
    <S.NotificationContainer
      onClick={dismissNotification}
      display={notification ? 1 : 0}
      type={type}
    >
      <p>{notification}</p>
    </S.NotificationContainer>
  );
};
