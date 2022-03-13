import React, { useEffect } from 'react'
import { FiTag } from 'react-icons/fi'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ValidationError } from 'yup'

import { Button, Input, Select } from 'ui'
import { getValidationErrors } from 'lib'

import { createUserSchema, profileSchema } from '../types'
import {
  getStepsWithError,
  setErrors,
  setState,
  useCreateUser,
} from '../useCreateUser'
import type { CreateUserStoreState } from '../useCreateUser/types'

import * as S from './Profile.styled'

type FormParams = Required<
  Pick<
    CreateUserStoreState,
    'monthlyIncome' | 'financialObjective' | 'likeBeCalled'
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
    monthlyIncome,
    financialObjective,
    likeBeCalled,
    email = '',
    fullName = '',
    password = '',
    isLoading,
    createUser,
  } = useCreateUser({
    name: 'profile',
    errors,
  })

  useEffect(() => {
    if (likeBeCalled) setValue('likeBeCalled', likeBeCalled)
    if (monthlyIncome) setValue('monthlyIncome', monthlyIncome)
    if (financialObjective) {
      setValue('financialObjective', financialObjective)
    }

    return () => {
      setState({ financialObjective: watch('financialObjective') })
    }
  }, [monthlyIncome, financialObjective, likeBeCalled, watch, setValue])

  async function handleOnSubmit(params: FormParams) {
    setState(params)

    try {
      const data = { email, fullName, password, ...params }

      await createUserSchema.validate(data, {
        abortEarly: false,
      })

      await createUser({
        email,
        fullName,
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
          error={errors.likeBeCalled?.message}
          {...register('likeBeCalled')}
          onBlur={(event) =>
            setState({ likeBeCalled: event.currentTarget.value })
          }
        />
        <Input.Amount
          name='monthlyIncome'
          label='Monthly income'
          placeholder='Ex. R$ 1.000,00'
          error={errors.monthlyIncome?.message}
          onBlur={(event) =>
            setState({ monthlyIncome: event.currentTarget.value })
          }
        />
        <Select
          name='financialObjective'
          label='Financial objective'
          placeholder='Ex. Make extra income'
          defaultValue={financialObjective}
          error={errors.financialObjective?.message}
        >
          <Select.Option
            displayValue='Make extra income'
            value='make_extra_income'
          >
            Make extra income
          </Select.Option>
          <Select.Option
            displayValue='Make an emergency fund'
            value='make_an_emergency_fund'
          >
            Make an emergency fund
          </Select.Option>
          <Select.Option
            displayValue='Make an investment portfolio'
            value='make_an_investment_portfolio'
          >
            Make an investment portfolio
          </Select.Option>
        </Select>
        <Button size='lg' htmlType='submit' loading={isLoading}>
          Create your account
        </Button>
      </S.Form>
    </FormProvider>
  )
}
