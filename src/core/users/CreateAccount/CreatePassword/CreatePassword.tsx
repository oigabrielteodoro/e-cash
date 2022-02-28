import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { Button, Input, PasswordStrength } from 'ui'

import { passwordSchema } from '../types'
import { setState, useCreateAccount } from '../useCreateAccount'
import type { CreateAccountStoreState } from '../useCreateAccount/types'

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
    resolver: yupResolver(passwordSchema),
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
          onBlur={(event) =>
            setState({
              password: event.currentTarget.value,
            })
          }
        />
        <PasswordStrength value={passwordValue} />
        <Button size='lg' htmlType='submit' disabled={isDisabled}>
          Create your password
        </Button>
      </S.Form>
    </>
  )
}
