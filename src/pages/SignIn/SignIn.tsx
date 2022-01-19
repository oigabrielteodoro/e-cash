import React from 'react'

import { MdAlternateEmail } from 'react-icons/md'

import { Button, Input, PasswordInput } from 'ui'

import { Layout } from './Layout'

import { useSignIn } from './useSignIn'
import * as S from './SignIn.styled'

export function SignIn() {
  const { errors, register, setFocus, onSubmit } = useSignIn()

  return (
    <Layout>
      <S.Container>
        <h1>Welcome to e-cash</h1>
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
            onKeyDown={() => setFocus('password')}
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
          <Button type='submit'>Join in account</Button>
          <S.Separator>OR</S.Separator>
          <S.CreateAccountLink to='/register'>
            Create an account
          </S.CreateAccountLink>
        </form>
      </S.Container>
    </Layout>
  )
}
