import React from 'react'

import { MdAlternateEmail } from 'react-icons/md'

import { Button, Input, PasswordInput } from 'ui'

import { Layout } from './Layout'

import { useSignIn } from './useSignIn'
import * as S from './SignIn.styled'

export function SignIn() {
  const { errors, isLoading, register, onSubmit } = useSignIn()

  return (
    <Layout>
      <S.Container>
        <h1>Hello 👋, welcome!</h1>
        <h4>
          Take full control of your financial life from
          <br /> now on with our help
        </h4>
        <form onSubmit={onSubmit}>
          <Input
            id='email'
            label='Email'
            icon={MdAlternateEmail}
            placeholder='example@mail.com'
            error={errors.email?.message}
            {...register('email')}
          />
          <PasswordInput
            id='password'
            label='Password'
            placeholder='Secret password'
            error={errors.password?.message}
            {...register('password')}
          />
          <S.ForgotPasswordLink to='/forgot_password'>
            Forgot your password?
          </S.ForgotPasswordLink>
          <Button size='lg' type='submit' loading={isLoading}>
            Join in account
          </Button>
          <S.Separator>OR</S.Separator>
          <S.CreateAccountText>
            Don&apos;t have an account
            <S.CreateAccountLink to='/register'>
              Sign up for free
            </S.CreateAccountLink>
          </S.CreateAccountText>
        </form>
      </S.Container>
    </Layout>
  )
}
