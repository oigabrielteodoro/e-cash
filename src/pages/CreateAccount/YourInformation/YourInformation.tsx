import React from 'react'
import { MdAlternateEmail } from 'react-icons/md'
import { FiUser } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { Button, Input } from 'ui'

import { setState, useCreateAccount } from '../useCreateAccount'

import * as S from './YourInformation.styled'

type Props = {
  onGoTo: () => void
  onGoNext: () => void
}

type FormParams = {
  email: string
  full_name: string
}

const schema = yup.object().shape({
  email: yup
    .string()
    .required('Email is a required field')
    .email('Email must be a valid email'),
  full_name: yup.string().required('Full name is a required field'),
})

export function YourInformation({ onGoTo, onGoNext }: Props) {
  const { email, full_name } = useCreateAccount()

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormParams>({
    resolver: yupResolver(schema),
    defaultValues: {
      email,
      full_name,
    },
  })

  function handleOnSubmit(data: FormParams) {
    setState(data)
    onGoNext()
  }

  return (
    <>
      <strong onClick={onGoTo}>Your information</strong>
      <p>
        Tell us a little more about yourself! That way we will be able to create
        a better relationship 😄
      </p>
      <S.Form onSubmit={handleSubmit(handleOnSubmit)}>
        <Input
          id='email'
          label='Email'
          icon={MdAlternateEmail}
          placeholder='example@mail.com'
          error={errors.email?.message}
          {...register('email')}
        />
        <Input
          id='full_name'
          label='Name'
          icon={FiUser}
          placeholder='Ex: John Doe'
          error={errors.full_name?.message}
          {...register('full_name')}
        />
        <Button size='lg' type='submit'>
          Continue
        </Button>
      </S.Form>
    </>
  )
}
