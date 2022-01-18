import React from 'react'
import { useForm } from 'react-hook-form'
import { MdAlternateEmail } from 'react-icons/md'
import { AiOutlineLock } from 'react-icons/ai'

import { Input } from 'ui'

import { Layout } from './Layout'

import * as S from './SignIn.styled'

export function SignIn() {
  const { register } = useForm()

  return (
    <Layout>
      <S.Container>
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
      </S.Container>
    </Layout>
  )
}
