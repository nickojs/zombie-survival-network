import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Gradient } from '../../generalStyles';
import * as S from './styles';

export default () => {
  const {
    register, handleSubmit, errors, watch
  } = useForm();
  const onSubmit = (data: Record<string, any>) => console.log(data);
  console.log(errors);
  const watchPassword = watch('password');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <S.TextField
        type="text"
        placeholder="username"
        name="username"
        ref={register({ required: true })}
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

      <Button type="submit" gradient={Gradient.MAIN}>
        Confirm
      </Button>
    </form>
  );
};
