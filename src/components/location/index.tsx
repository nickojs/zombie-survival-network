import React, { useEffect, useState } from 'react';

import useRequest, { Options, State } from '../../hooks/useRequest';
import { NotificationTypes, useNotification } from '../../contexts/notificationContext';
import { useAuth } from '../../contexts/authContext';

import {
  Button, Container, Gradient, Title
} from '../../generalStyles';

interface Coords {
  latitude: number;
  longitude: number;
}

export default () => {
  const [location, setLocation] = useState<Coords | null>(null);
  const [options, setOptions] = useState<Options>(null);

  const [requestData] = useRequest(options);
  const { data, loading, error } = requestData as State;

  const { messageHandler } = useNotification();

  const { user, updateUser } = useAuth();

  const locationHandler = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { coords } = position;
        const { latitude, longitude } = coords;
        setLocation({ latitude, longitude });
      },
      (err) => {
        const { message } = err;
        messageHandler(message, NotificationTypes.ERROR);
      }
    );
  };

  useEffect(() => {
    if (location) {
      setOptions({
        method: 'PUT',
        url: 'user/location',
        data: location
      });
    }
  }, [location]);

  useEffect(() => {
    if (data) {
      messageHandler(data.message, NotificationTypes.SUCCESS);
      updateUser();
    }
  }, [data]);

  useEffect(() => {
    if (error) messageHandler(error, NotificationTypes.ERROR);
  }, [error]);

  useEffect(() => { updateUser(); }, []);

  return (
    <Container>
      <Title>Location</Title>
      {!user?.location && (
        <p>Use this module to set your current location.</p>
      )}
      {user?.location && (
        <p>
          Your current location is set at: Lat
          {' '}
          {user.location.latitude}
          {' '}
          Lon:
          {' '}
          {user.location.longitude}
        </p>
      )}
      <hr />
      <Button
        type="button"
        gradient={Gradient.MAIN}
        onClick={locationHandler}
        disabled={loading}
      >
        Update my location
      </Button>
    </Container>
  );
};
