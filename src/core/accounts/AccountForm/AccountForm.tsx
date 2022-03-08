import React, { RefObject } from 'react'
import { FiTag } from 'react-icons/fi'
import { AiOutlineBank, AiOutlineFieldNumber } from 'react-icons/ai'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { Col, Input, Row, Switch } from 'ui'
import { BankingInstitutionsSelect } from 'core/bankingInstitutions'
import { accountNumberWithDigitMask, agencyNumberWithoutDigitMask } from 'lib'

import { CategoriesSelect } from '../CategoriesSelect'

import { AccountFormParams, bankAccountSchema } from './types'

type Props = {
  formRef: RefObject<HTMLButtonElement>
  onSubmit: (params: AccountFormParams) => void
}

export function AccountForm({ formRef, onSubmit }: Props) {
  const form = useForm<AccountFormParams>({
    resolver: yupResolver(bankAccountSchema),
    defaultValues: {
      include_sum_on_dashboard: false,
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
              name='banking_institution'
              label='Banking Institution'
              error={errors.banking_institution?.message}
            />
          </Col>
          <Col span={12}>
            <Input.Masked
              name='banking_agency'
              mask={[agencyNumberWithoutDigitMask]}
              placeholder='Example: 0000'
              label='Agency (without digit)'
              icon={AiOutlineFieldNumber}
              error={errors.banking_agency?.message}
            />
          </Col>
          <Col span={12}>
            <Input.Masked
              name='banking_account'
              mask={[accountNumberWithDigitMask]}
              placeholder='Example: 000000-0'
              label='Account (with digit)'
              icon={AiOutlineBank}
              error={errors.banking_account?.message}
            />
          </Col>
          <Col span={24}>
            <Switch
              name='include_sum_on_dashboard'
              label='Do you want to include the sum in the dashboard?'
            />
          </Col>
        </Row>
        <button ref={formRef} type='submit' hidden />
      </form>
    </FormProvider>
  )
}
