import React, { useEffect, useState } from 'react';
import { NotificationTypes, useNotification } from '../../contexts/notificationContext';
import {
  Button, Container, Gradient, Title
} from '../../generalStyles';
import useRequest, { Options, State } from '../../hooks/useRequest';

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
    if (data) messageHandler(data.message, NotificationTypes.SUCCESS);
  }, [data]);

  useEffect(() => {
    if (error) messageHandler(error, NotificationTypes.ERROR);
  }, [error]);

  return (
    <Container>
      <Title>Location</Title>
      <p>Use this module to set your current location.</p>
      <p>Due to fraud related issues, the location should be provided by the browser</p>
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
