import React, { useEffect } from 'react'
import { MdAlternateEmail } from 'react-icons/md'
import { FiUser } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { Button, Input } from 'ui'

import {
  CreateAccountStoreState,
  setState,
  useCreateAccount,
} from '../useCreateAccount'

import * as S from './Contact.styled'

type Props = {
  onSubmit: () => void
}

type FormParams = Required<Pick<CreateAccountStoreState, 'email' | 'full_name'>>

const schema = yup.object().shape({
  email: yup
    .string()
    .required('Email is a required field')
    .email('Email must be a valid email'),
  full_name: yup.string().required('Full name is a required field'),
})

export function Contact({ onSubmit }: Props) {
  const {
    formState: { errors, touchedFields },
    handleSubmit,
    register,
    setValue,
  } = useForm<FormParams>({
    resolver: yupResolver(schema),
    shouldFocusError: true,
  })

  const { email, full_name } = useCreateAccount({
    name: 'contact',
    errors,
  })

  useEffect(() => {
    if (email) setValue('email', email)
    if (full_name) setValue('full_name', full_name)
  }, [email, full_name, setValue])

  const isErrored = !!errors?.email || !!errors?.full_name
  const isFilled = !!email || !!full_name
  const isTouched = touchedFields.email || touchedFields.full_name
  const isDisabled = (!isTouched && !isFilled) || isErrored

  function handleOnSubmit(data: FormParams) {
    setState({ ...data })
    onSubmit()
  }

  return (
    <>
      <strong>Your information</strong>
      <p>
        Tell us a little more about yourself! That way we will be able to create
        a better relationship 😄
      </p>
      <S.Form onSubmit={handleSubmit(handleOnSubmit)}>
        <Input
          id='full_name'
          label='Name'
          icon={FiUser}
          placeholder='Ex: John Doe'
          error={errors.full_name?.message}
          defaultValue={full_name}
          {...register('full_name')}
        />
        <Input
          id='email'
          label='Email'
          icon={MdAlternateEmail}
          placeholder='example@mail.com'
          error={errors.email?.message}
          defaultValue={email}
          {...register('email')}
        />

        <Button size='lg' type='submit' disabled={isDisabled}>
          Confirm your information
        </Button>
      </S.Form>
    </>
  )
}
