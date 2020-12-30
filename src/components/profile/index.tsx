import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/authContext';
import { NotificationTypes, useNotification } from '../../contexts/notificationContext';
import {
  Button, Container, ErrorMsg, Gradient, TextField, Title
} from '../../generalStyles';
import useRequest, { Options, State } from '../../hooks/useRequest';
import { UserProfile } from '../../models/user';
import * as S from './styles';

export default () => {
  const {
    register, handleSubmit, errors, setValue
  } = useForm();
  const [options, setOptions] = useState<Options>(null);
  const [requestData] = useRequest(options);
  const { data, error, loading } = requestData as State;

  const { messageHandler } = useNotification();
  const { updateProfile, user } = useAuth();
  const { profile } = user || { };

  const onSubmit = (data: Record<string, any>) => setOptions({
    method: 'PUT',
    url: 'user/profile',
    data: { ...data, age: +data.age }
  });

  useEffect(() => {
    if (error) {
      messageHandler(error, NotificationTypes.ERROR);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      messageHandler(data.message, NotificationTypes.SUCCESS);
      updateProfile(data.profile);
    }
  }, [data]);

  useEffect(() => {
    if (profile) {
      Object.keys(profile).forEach((e: string) => {
        const value = profile[e as keyof UserProfile];
        setValue(e, value);
      });
    }
  }, [profile]);

  return (
    <Container>
      <Title>Profile</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          type="text"
          placeholder="name"
          name="fullName"
          ref={register({ required: true })}
        />
        {errors.fullName?.type === 'required' && <ErrorMsg>Required field</ErrorMsg>}

        <TextField
          type="number"
          placeholder="age"
          name="age"
          ref={register({ required: true, min: 0, max: 99 })}
        />
        {errors.age?.type === 'required'
          && <ErrorMsg>Required field</ErrorMsg>}
        {(errors.age?.type === 'min' || errors.age?.type === 'max')
          && <ErrorMsg>Invalid value</ErrorMsg>}

        <S.GenderContainer>
          <label htmlFor="gender">
            Male
            <input name="gender" type="radio" value="male" ref={register({ required: true })} />
          </label>
          <label htmlFor="gender">
            Female
            <input name="gender" type="radio" value="female" ref={register({ required: true })} />
          </label>
        </S.GenderContainer>
        {errors.gender?.type === 'required' && <ErrorMsg>Select a gender</ErrorMsg>}

        <Button
          type="submit"
          gradient={Gradient.MAIN}
          loading={loading ? 1 : 0}
          disabled={loading}
        >
          {profile ? 'Update' : 'Create'}
        </Button>
      </form>
    </Container>
  );
};
