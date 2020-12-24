import React from 'react';
import { useNotification } from '../../contexts/notificationContext';
import * as S from './styles';

export default () => {
  const { notification, messageHandler } = useNotification();

  const dismissNotification = () => { messageHandler(''); };

  return (
    <S.NotificationContainer
      onClick={dismissNotification}
      display={notification ? 1 : 0}
    >
      <p>{notification}</p>
    </S.NotificationContainer>
  );
};
