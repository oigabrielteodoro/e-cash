import React, { RefObject } from 'react'
import { FiTag } from 'react-icons/fi'
import { AiOutlineBank, AiOutlineFieldNumber } from 'react-icons/ai'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { Col, Input, Row, Switch } from 'ui'
import { BankingInstitutionsSelect } from 'core/bankingInstitutions'
import {
  accountNumberWithDigitMask,
  agencyNumberWithoutDigitMask,
  onlyNumbers,
} from 'lib'
import type { AccountFormParams } from 'client'

import { CategoriesSelect } from '../CategoriesSelect'

type Props = {
  formRef: RefObject<HTMLButtonElement>
  onSubmit: (params: AccountFormParams) => void
}

export function AccountForm({ formRef, onSubmit }: Props) {
  const form = useForm<AccountFormParams>({
    resolver: yupResolver(resolver),
    defaultValues: {
      includeSumOnDashboard: false,
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={[32, 32]}>
          <Col span={12}>
            <Input
              label='Name'
              icon={FiTag}
              placeholder='Example: Personal account'
              error={errors.name?.message}
              {...register('name')}
            />
          </Col>
          <Col span={12}>
            <CategoriesSelect
              placeholder='Example: Investment'
              name='category'
              label='Category'
              error={errors.category?.message}
            />
          </Col>
          <Col span={12}>
            <Input.Amount
              name='balance'
              label='Balance'
              placeholder='Example: R$ 15,000.00'
              error={errors.balance?.message}
            />
          </Col>
          <Col span={12}>
            <BankingInstitutionsSelect
              placeholder='Select banking institution'
              name='bankingInstitutionId'
              label='Banking Institution'
              error={errors.bankingInstitutionId?.message}
            />
          </Col>
          <Col span={12}>
            <Input.Masked
              name='agencyNumber'
              mask={[agencyNumberWithoutDigitMask]}
              placeholder='Example: 0000'
              label='Agency (without digit)'
              icon={AiOutlineFieldNumber}
              error={errors.agencyNumber?.message}
            />
          </Col>
          <Col span={12}>
            <Input.Masked
              name='accountNumber'
              mask={[accountNumberWithDigitMask]}
              placeholder='Example: 000000-0'
              label='Account (with digit)'
              icon={AiOutlineBank}
              error={errors.accountNumber?.message}
            />
          </Col>
          <Col span={24}>
            <Switch
              name='includeSumOnDashboard'
              label='Do you want to include the sum in the dashboard?'
            />
          </Col>
        </Row>
        <button ref={formRef} aria-label='submit' type='submit' hidden />
      </form>
    </FormProvider>
  )
}

const resolver = yup.object({
  name: yup.string().required('Name is a required field'),
  category: yup.string().required(),
  bankingInstitutionId: yup
    .string()
    .required('Institution is a required field'),
  agencyNumber: yup
    .string()
    .required('Agency is a required field')
    .matches(onlyNumbers),
  accountNumber: yup
    .string()
    .required('Account is a required field')
    .matches(onlyNumbers),
  balance: yup
    .string()
    .required('Balance is a required field')
    .matches(onlyNumbers),
})
