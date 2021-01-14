import React from 'react';

import { useNotification } from '../../contexts/notificationContext';

import * as S from './styles';

export default () => {
  const {
    notification, type, show, dismissNotification
  } = useNotification();

  return notification ? (
    <S.NotificationContainer
      onClick={dismissNotification}
      display={show ? 1 : 0}
      type={type}
    >
      <p>{notification}</p>
    </S.NotificationContainer>
  ) : <></>;
};
