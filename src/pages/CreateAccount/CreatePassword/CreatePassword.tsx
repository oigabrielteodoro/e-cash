import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { Button, PasswordInput, PasswordStrength } from 'ui'

import { setState, useCreateAccount } from '../useCreateAccount'

import * as S from './CreatePassword.styled'

type Props = {
  onSubmit: () => void
}

type FormParams = {
  password: string
  password_confirmation: string
}

export function CreatePassword({ onSubmit }: Props) {
  const { password = '', password_confirmation } = useCreateAccount()

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<FormParams>({
    resolver: yupResolver(schema),
    shouldFocusError: true,
    defaultValues: {
      password,
      password_confirmation,
    },
  })

  const passwordValue = watch('password', password)

  const isFilled = !!password || !!password_confirmation
  const isErrored = !!errors?.password || !!errors?.password_confirmation
  const isTouched =
    touchedFields.password || touchedFields.password_confirmation
  const isDisabled = (!isTouched && !isFilled) || isErrored

  function handleOnSubmit({ password, password_confirmation }: FormParams) {
    setState({
      password,
      password_confirmation,
    })
    onSubmit()
  }

  return (
    <>
      <strong>Create password</strong>
      <p>Create a password strong enough for anyone to access your account</p>
      <S.Form onSubmit={handleSubmit(handleOnSubmit)}>
        <PasswordInput
          label='Password'
          placeholder='Secret password'
          error={errors.password?.message}
          {...register('password')}
        />
        <PasswordStrength value={passwordValue} />
        <PasswordInput
          label='Confirm password'
          placeholder='Confirm secret password'
          error={errors.password_confirmation?.message}
          {...register('password_confirmation')}
        />
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
  password_confirmation: yup
    .string()
    .required('Confirm password is a required field')
    .oneOf([yup.ref('password'), null], 'Password must match'),
})
