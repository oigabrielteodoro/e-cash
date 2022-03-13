import React, { useEffect } from 'react'
import { MdAlternateEmail } from 'react-icons/md'
import { FiUser } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { Button, Input } from 'ui'

import { contactSchema } from '../types'
import { setState, useCreateUser } from '../useCreateUser'
import type { CreateUserStoreState } from '../useCreateUser/types'

import * as S from './Contact.styled'

type Props = {
  onSubmit: () => void
}

type FormParams = Required<Pick<CreateUserStoreState, 'email' | 'fullName'>>

export function Contact({ onSubmit }: Props) {
  const {
    formState: { errors, touchedFields },
    handleSubmit,
    register,
    setValue,
  } = useForm<FormParams>({
    resolver: yupResolver(contactSchema),
    shouldFocusError: true,
  })

  const { email, fullName } = useCreateUser({
    name: 'contact',
    errors,
  })

  useEffect(() => {
    if (email) setValue('email', email)
    if (fullName) setValue('fullName', fullName)
  }, [email, fullName, setValue])

  const isErrored = !!errors?.email || !!errors?.fullName
  const isFilled = !!email || !!fullName
  const isTouched = touchedFields.email || touchedFields.fullName
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
          id='fullName'
          label='Name'
          icon={FiUser}
          placeholder='Ex: John Doe'
          error={errors.fullName?.message}
          defaultValue={fullName}
          {...register('fullName')}
          onBlur={(event) => setState({ fullName: event.currentTarget.value })}
        />
        <Input
          id='email'
          label='Email'
          icon={MdAlternateEmail}
          placeholder='example@mail.com'
          error={errors.email?.message}
          defaultValue={email}
          {...register('email')}
          onBlur={(event) => setState({ email: event.currentTarget.value })}
        />

        <Button size='lg' htmlType='submit' disabled={isDisabled}>
          Confirm your information
        </Button>
      </S.Form>
    </>
  )
}
