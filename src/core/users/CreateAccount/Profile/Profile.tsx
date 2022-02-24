import React, { useEffect } from 'react'
import { FiTag } from 'react-icons/fi'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ValidationError } from 'yup'

import { Button, Input, Select } from 'ui'
import { getValidationErrors } from 'lib'

import { createAccountSchema, profileSchema } from '../types'
import {
  getStepsWithError,
  setErrors,
  setState,
  useCreateAccount,
} from '../useCreateAccount'
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
    resolver: yupResolver(profileSchema),
    shouldFocusError: true,
  })

  const {
    formState: { errors },
    handleSubmit,
    setValue,
    register,
    watch,
  } = form

  const {
    monthly_income,
    financial_objective,
    like_be_called,
    email = '',
    full_name = '',
    password = '',
    isLoading,
    createUser,
  } = useCreateAccount({
    name: 'profile',
    errors,
  })

  useEffect(() => {
    if (like_be_called) setValue('like_be_called', like_be_called)
    if (monthly_income) setValue('monthly_income', monthly_income)
    if (financial_objective) {
      setValue('financial_objective', financial_objective)
    }

    return () => {
      setState({ financial_objective: watch('financial_objective') })
    }
  }, [monthly_income, financial_objective, like_be_called, watch, setValue])

  async function handleOnSubmit(params: FormParams) {
    setState(params)

    try {
      const data = { email, full_name, password, ...params }

      await createAccountSchema.validate(data, {
        abortEarly: false,
      })

      await createUser({
        email,
        full_name,
        password,
        ...params,
      })
    } catch (error) {
      if (error instanceof ValidationError) {
        const errors = getValidationErrors(error)

        return setErrors(getStepsWithError(errors))
      }
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
          error={errors.like_be_called?.message}
          {...register('like_be_called')}
          onBlur={(event) =>
            setState({ like_be_called: event.currentTarget.value })
          }
        />
        <Input.Amount
          name='monthly_income'
          label='Monthly income'
          placeholder='Ex. R$ 1.000,00'
          error={errors.monthly_income?.message}
          onBlur={(event) =>
            setState({ monthly_income: event.currentTarget.value })
          }
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
        <Button size='lg' loading={isLoading}>
          Create your account
        </Button>
      </S.Form>
    </FormProvider>
  )
}
