import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Gradient } from '../../generalStyles';
import * as S from './styles';

export default () => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data: Record<string, any>) => console.log(data);
  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <S.TextField
        type="identifier"
        placeholder="email or username"
        name="identifier"
        ref={register({ required: true })}
      />
      {errors.identifier?.type === 'required' && <S.ErrorMsg>Required field</S.ErrorMsg>}
      <S.TextField
        type="text"
        placeholder="password"
        name="password"
        ref={register}
      />

      <Button type="submit" gradient={Gradient.MAIN}>
        Confirm
      </Button>
    </form>
  );
};
