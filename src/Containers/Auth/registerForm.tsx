import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Gradient } from '../../generalStyles';
import useRequest, { Options, State } from '../../hooks/useRequest';
import * as S from './styles';

export default () => {
  const {
    register, handleSubmit, errors, watch
  } = useForm();
  const [options, setOptions] = useState<Options>(null);
  const [requestData] = useRequest(options);
  const { data, error, loading } = requestData as State;

  const watchPassword = watch('password');

  const onSubmit = (data: Record<string, any>) => setOptions({
    method: 'POST',
    url: 'user/',
    data
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <S.TextField
        type="text"
        placeholder="username"
        name="username"
        ref={register({ required: true, minLength: 4, maxLength: 16 })}
      />
      {errors.username?.type === 'required' && <S.ErrorMsg>Required field</S.ErrorMsg>}

      <S.TextField
        type="email"
        placeholder="email"
        name="email"
        ref={register({ required: true, pattern: /^\S+@\S+$/i })}
      />
      {errors.email?.type === 'required' && <S.ErrorMsg>Required field</S.ErrorMsg>}
      {errors.email?.type === 'pattern' && <S.ErrorMsg>Invalid email</S.ErrorMsg>}

      <S.TextField
        type="password"
        placeholder="password"
        name="password"
        ref={register({ required: true })}
      />
      {errors.password?.type === 'required' && <S.ErrorMsg>Required field</S.ErrorMsg>}

      <S.TextField
        type="password"
        placeholder="confirm password"
        name="confirmPassword"
        ref={register({ validate: (value) => value === watchPassword })}
      />
      {errors.confirmPassword?.type === 'validate' && <S.ErrorMsg>Passwords don&apos;t match</S.ErrorMsg>}

      <Button
        type="submit"
        gradient={Gradient.MAIN}
        loading={loading}
        disabled={loading}
      >
        Confirm
      </Button>
    </form>
  );
};
