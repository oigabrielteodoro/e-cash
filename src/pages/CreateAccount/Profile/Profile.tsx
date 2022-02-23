import React, { useEffect } from 'react'
import { FiTag } from 'react-icons/fi'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { Button, Input, Select } from 'ui'

import { setState, useCreateAccount } from '../useCreateAccount'
import type { CreateAccountStoreState } from '../useCreateAccount/types'

import * as S from './Profile.styled'

type FormParams = Required<
  Pick<
    CreateAccountStoreState,
    'monthly_income' | 'financial_objective' | 'like_be_called'
  >
>

export function Profile() {
  const form = useForm<FormParams>({
    resolver: yupResolver(schema),
  })

  const {
    formState: { errors },
    handleSubmit,
    setValue,
    register,
  } = form

  const {
    monthly_income,
    financial_objective,
    email,
    full_name,
    password,
    createUser,
  } = useCreateAccount({
    name: 'profile',
    errors,
  })

  useEffect(() => {
    if (monthly_income) setValue('monthly_income', monthly_income)
    if (financial_objective) {
      setValue('financial_objective', financial_objective)
    }
  }, [monthly_income, financial_objective, setValue])

  const isValid = email && full_name && password

  async function handleOnSubmit(params: FormParams) {
    setState(params)

    if (isValid) {
      createUser({
        email,
        full_name,
        password,
        ...params,
      })
    }
  }

  return (
    <FormProvider {...form}>
      <strong>A little more about you...</strong>
      <p>We need a little more information to boost your financial life</p>
      <S.Form onSubmit={handleSubmit(handleOnSubmit)}>
        <Input
          icon={FiTag}
          label='Like be called'
          placeholder='How do you like to be called?'
          {...register('like_be_called')}
        />
        <Input.Amount
          name='monthly_income'
          label='Monthly income'
          placeholder='Ex. R$ 1.000,00'
          error={errors.monthly_income?.message}
        />
        <Select
          name='financial_objective'
          label='Financial objective'
          placeholder='Ex. Make extra income'
          defaultValue={financial_objective}
          error={errors.financial_objective?.message}
        >
          <Select.Option value='make_extra_income'>
            Make extra income
          </Select.Option>
          <Select.Option value='make_an_emergency_fund'>
            Make an emergency fund
          </Select.Option>
          <Select.Option value='make_an_investment_portfolio'>
            Make an investment portfolio
          </Select.Option>
        </Select>
        <Button size='lg'>Confirm your profile</Button>
      </S.Form>
    </FormProvider>
  )
}

const schema = yup.object().shape({
  monthly_income: yup.string().required('Monthly income is a required field'),
  financial_objective: yup
    .string()
    .required('Financial objective is a required field'),
  like_be_called: yup.string().required('Like be called is a required field'),
})
