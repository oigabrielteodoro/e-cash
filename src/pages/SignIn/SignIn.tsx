import React from 'react'

import { AiOutlineLock } from 'react-icons/ai'
import { MdAlternateEmail } from 'react-icons/md'

import { useForm } from 'react-hook-form'

import { Button, Input } from 'ui'

import { Layout } from './Layout'

import * as S from './SignIn.styled'

export function SignIn() {
  const { register } = useForm()

  return (
    <Layout>
      <S.Container>
        <h1>Welcome to e-cash</h1>
        <h4>
          Take full control of your financial life from
          <br /> now on with our help
        </h4>
        <form>
          <Input
            label='E-mail'
            icon={MdAlternateEmail}
            placeholder='example@mail.com'
            {...register('email')}
          />
          <Input
            label='Password'
            icon={AiOutlineLock}
            placeholder='Secret password'
            {...register('password')}
          />
          <S.ForgotPasswordLink to='/forgot_password'>
            Forgot your password?
          </S.ForgotPasswordLink>
          <Button>Join in account</Button>
          <S.Separator>OR</S.Separator>
          <S.CreateAccountLink to='/register'>
            Create an account
          </S.CreateAccountLink>
        </form>
      </S.Container>
    </Layout>
  )
}
