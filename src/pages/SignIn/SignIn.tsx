import React, { useRef } from 'react'

import { MdAlternateEmail } from 'react-icons/md'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { Button, Input, PasswordInput } from 'ui'

import { Layout } from './Layout'

import * as S from './SignIn.styled'

type UseForm = {
  email: string
  password: string
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
})

export function SignIn() {
  const buttonRef = useRef<HTMLButtonElement>(null)

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<UseForm>({
    resolver: yupResolver(schema),
  })

  function handleOnSubmit() {
    alert('Submited')
  }

  return (
    <Layout>
      <S.Container>
        <h1>Welcome to e-cash</h1>
        <h4>
          Take full control of your financial life from
          <br /> now on with our help
        </h4>
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <Input
            id='email'
            label='Email'
            icon={MdAlternateEmail}
            placeholder='example@mail.com'
            error={errors.email?.message}
            onKeyDown={() => setFocus('password')}
            {...register('email')}
          />
          <PasswordInput
            id='password'
            label='Password'
            placeholder='Secret password'
            error={errors.password?.message}
            onKeyDown={() => buttonRef?.current?.click()}
            {...register('password')}
          />
          <S.ForgotPasswordLink to='/forgot_password'>
            Forgot your password?
          </S.ForgotPasswordLink>
          <Button ref={buttonRef} type='submit'>
            Join in account
          </Button>
          <S.Separator>OR</S.Separator>
          <S.CreateAccountLink to='/register'>
            Create an account
          </S.CreateAccountLink>
        </form>
      </S.Container>
    </Layout>
  )
}
