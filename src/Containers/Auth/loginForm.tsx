import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Gradient } from '../../generalStyles';
import * as S from './styles';
import useRequest, { Options } from '../../hooks/useRequest';

export default () => {
  const [options, setOptions] = useState<Options>(null);
  const [requestData] = useRequest(options);
  const { data, error, loading } = requestData;

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data: Record<string, any>) => setOptions({
    method: 'POST',
    url: 'auth/signin',
    data
  });

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
