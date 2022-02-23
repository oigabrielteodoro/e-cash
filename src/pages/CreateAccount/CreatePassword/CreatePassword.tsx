import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { Button, Input, PasswordStrength } from 'ui'

import {
  CreateAccountStoreState,
  setState,
  useCreateAccount,
} from '../useCreateAccount'

import * as S from './CreatePassword.styled'

type Props = {
  onSubmit: () => void
}

type FormParams = Required<Pick<CreateAccountStoreState, 'password'>>

export function CreatePassword({ onSubmit }: Props) {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormParams>({
    resolver: yupResolver(schema),
    shouldFocusError: true,
  })

  const { password = '' } = useCreateAccount({
    name: 'password',
    errors,
  })

  useEffect(() => {
    if (password) setValue('password', password)
  }, [password, setValue])

  const passwordValue = watch('password', password)

  const isDisabled = !!errors?.password

  function handleOnSubmit({ password }: FormParams) {
    setState({
      password,
    })
    onSubmit()
  }

  return (
    <>
      <strong>Create password</strong>
      <p>Create a password strong enough for anyone to access your account</p>
      <S.Form onSubmit={handleSubmit(handleOnSubmit)}>
        <Input.Password
          label='Password'
          placeholder='Secret password'
          error={errors.password?.message}
          {...register('password')}
        />
        <PasswordStrength value={passwordValue} />
        <Button size='lg' type='submit' disabled={isDisabled}>
          Create your password
        </Button>
      </S.Form>
    </>
  )
}

const schema = yup.object().shape({
  password: yup
    .string()
    .required('Password is a required field')
    .min(6, 'Password must be 6 characters long')
    .matches(/[A-Z]/, 'Password must have an uppercase character')
    .matches(/[a-z]/, 'Password must have an lowercase character')
    .matches(/[0-9]/, 'Password must have a number')
    .matches(/[a-zA-Z]/, 'Password must have a text')
    .matches(/[^A-Z a-z0-9]/, 'Password must have a symbol'),
})
