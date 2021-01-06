import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import useRequest, { Options, State } from '../../hooks/useRequest';
import { NotificationTypes, useNotification } from '../../contexts/notificationContext';

import {
  Button, ErrorMsg, Gradient, TextField
} from '../../generalStyles';

export default () => {
  const {
    register, handleSubmit, errors, watch
  } = useForm();
  const [options, setOptions] = useState<Options>(null);
  const [requestData] = useRequest(options);
  const { data, error, loading } = requestData as State;
  const { messageHandler } = useNotification();

  const watchPassword = watch('password');

  const onSubmit = (data: Record<string, any>) => setOptions({
    method: 'POST',
    url: 'user/',
    data
  });

  useEffect(() => {
    if (error) {
      messageHandler(error, NotificationTypes.ERROR);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      messageHandler(data.message, NotificationTypes.SUCCESS);
    }
  }, [data]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        type="text"
        placeholder="username"
        name="username"
        ref={register({ required: true, minLength: 4, maxLength: 16 })}
      />
      {errors.username?.type === 'required' && <ErrorMsg>Required field</ErrorMsg>}

      <TextField
        type="email"
        placeholder="email"
        name="email"
        ref={register({ required: true, pattern: /^\S+@\S+$/i })}
      />
      {errors.email?.type === 'required' && <ErrorMsg>Required field</ErrorMsg>}
      {errors.email?.type === 'pattern' && <ErrorMsg>Invalid email</ErrorMsg>}

      <TextField
        type="password"
        placeholder="password"
        name="password"
        ref={register({ required: true })}
      />
      {errors.password?.type === 'required' && <ErrorMsg>Required field</ErrorMsg>}

      <TextField
        type="password"
        placeholder="confirm password"
        name="confirmPassword"
        ref={register({ validate: (value) => value === watchPassword })}
      />
      {errors.confirmPassword?.type === 'validate' && <ErrorMsg>Passwords don&apos;t match</ErrorMsg>}

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
