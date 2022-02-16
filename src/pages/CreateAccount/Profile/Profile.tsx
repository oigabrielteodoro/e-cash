import React from 'react'
import { FiDollarSign, FiTarget } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { Button, Input } from 'ui'
import {
  CreateAccountStoreState,
  setState,
  useCreateAccount,
} from '../useCreateAccount'

import * as S from './Profile.styled'

type FormParams = Required<
  Pick<CreateAccountStoreState, 'monthly_income' | 'financial_objective'>
>

const schema = yup.object().shape({
  monthly_income: yup.string().required('Monthly income is a required field'),
  financial_objective: yup
    .string()
    .required('Financial objective is a required field'),
})

export function Profile() {
  const { monthly_income, financial_objective } = useCreateAccount()
  const {
    formState: { errors, touchedFields },
    register,
    handleSubmit,
  } = useForm<FormParams>({
    defaultValues: {
      monthly_income,
      financial_objective,
    },
    resolver: yupResolver(schema),
  })

  const isFilled = !!monthly_income || !!financial_objective
  const isErrored = !!errors?.monthly_income || !!errors?.financial_objective
  const isTouched =
    touchedFields.monthly_income || touchedFields.financial_objective
  const isDisabled = (!isTouched && !isFilled) || isErrored

  async function handleOnSubmit({
    monthly_income,
    financial_objective,
  }: FormParams) {
    setState({ monthly_income, financial_objective })
  }

  return (
    <>
      <strong>A little more about you...</strong>
      <p>We need a little more information to boost your financial life</p>
      <S.Form onSubmit={handleSubmit(handleOnSubmit)}>
        <Input
          label='Monthly income'
          icon={FiDollarSign}
          placeholder='Ex. R$ 1.000,00'
          {...register('monthly_income')}
        />
        <Input
          label='Financial objective'
          icon={FiTarget}
          placeholder='Ex. Make extra income'
          {...register('financial_objective')}
        />
        <Button size='lg' disabled={isDisabled}>
          Confirm your profile
        </Button>
      </S.Form>
    </>
  )
}
