import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { Button, Input, Select } from 'ui'
import {
  CreateAccountStoreState,
  setState,
  useCreateAccount,
} from '../useCreateAccount'

import * as S from './Profile.styled'

type FormParams = Required<
  Pick<CreateAccountStoreState, 'monthly_income' | 'financial_objective'>
>

type Props = {
  onSubmit: () => void
}

const schema = yup.object().shape({
  monthly_income: yup.string().required('Monthly income is a required field'),
  financial_objective: yup
    .string()
    .required('Financial objective is a required field'),
})

export function Profile({ onSubmit }: Props) {
  const { monthly_income, financial_objective } = useCreateAccount()
  const form = useForm<FormParams>({
    defaultValues: {
      monthly_income,
      financial_objective,
    },
    resolver: yupResolver(schema),
  })

  const {
    formState: { errors },
    handleSubmit,
  } = form

  async function handleOnSubmit(params: FormParams) {
    setState(params)
    onSubmit()
  }

  return (
    <FormProvider {...form}>
      <strong>A little more about you...</strong>
      <p>We need a little more information to boost your financial life</p>
      <S.Form onSubmit={handleSubmit(handleOnSubmit)}>
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
