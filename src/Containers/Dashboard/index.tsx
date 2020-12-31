import React, { useEffect } from 'react';
import { useAuth } from '../../contexts/authContext';
import { NotificationTypes, useNotification } from '../../contexts/notificationContext';
import SurvivorList from '../../components/survivorList';

export default () => {
  const { user } = useAuth();
  const { profile } = user || { };

  const { messageHandler } = useNotification();

  useEffect(() => {
    if (!profile) {
      messageHandler(
        'There is no profile for this user, redirecting to profile creation',
        NotificationTypes.WARNING
      );
    }
  }, [profile]);

  return (
    <SurvivorList />
  );
};
