import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import useRequest, { Options, State } from '../../hooks/useRequest';
import { NotificationTypes, useNotification } from '../../contexts/notificationContext';
import { useAuth } from '../../contexts/authContext';

import {
  Button, ErrorMsg, Gradient, TextField
} from '../../generalStyles';

export default () => {
  const [options, setOptions] = useState<Options>(null);
  const [requestData] = useRequest(options);
  const { data, error, loading } = requestData as State;
  const { messageHandler } = useNotification();
  const { signIn } = useAuth();

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data: Record<string, any>) => setOptions({
    method: 'POST',
    url: 'auth/signin',
    data
  });

  useEffect(() => {
    if (error) {
      messageHandler(error, NotificationTypes.ERROR);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      const { token } = data;
      signIn(token);
    }
  }, [data]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        type="identifier"
        placeholder="email or username"
        name="identifier"
        ref={register({ required: true })}
      />
      {errors.identifier?.type === 'required' && <ErrorMsg>Required field</ErrorMsg>}
      <TextField
        type="password"
        placeholder="password"
        name="password"
        ref={register}
      />
      <Button
        type="submit"
        gradient={Gradient.MAIN}
        loading={loading ? 1 : 0}
        disabled={loading}
      >
        Confirm
      </Button>
    </form>
  );
};
