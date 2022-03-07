import React, { RefObject } from 'react'
import { FiTag } from 'react-icons/fi'
import { AiOutlineBank, AiOutlineFieldNumber } from 'react-icons/ai'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { Col, Input, Row, Select, Switch } from 'ui'
import { BankingInstitutionsSelect } from 'core/banking-institutions'
import { accountNumberWithDigitMask, agencyNumberWithoutDigitMask } from 'lib'

import { BankAccountFormParams, bankAccountSchema } from './types'

type Props = {
  formRef: RefObject<HTMLButtonElement>
  onSubmit: (params: BankAccountFormParams) => void
}

export function BankAccountForm({ formRef, onSubmit }: Props) {
  const form = useForm<BankAccountFormParams>({
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
            <BankingInstitutionsSelect
              placeholder='Select banking institution'
              name='banking_institution'
              label='Banking Institution'
              error={errors.banking_institution?.message}
            />
          </Col>
          <Col span={12}>
            <Input.Amount
              name='amount_balance'
              label='Amount balance'
              placeholder='Example: R$ 15,000.00'
              error={errors.amount_balance?.message}
            />
          </Col>
          <Col span={12}>
            <Select
              placeholder='Example: Investment'
              name='category'
              label='Category'
              error={errors.category?.message}
            >
              <Select.Option displayValue='Investments' value='investments'>
                Investments
              </Select.Option>
              <Select.Option displayValue='Savings' value='savings'>
                Savings
              </Select.Option>
              <Select.Option displayValue='Money' value='money'>
                Money
              </Select.Option>
              <Select.Option
                displayValue='Checking Account'
                value='checking_account'
              >
                Checking Account
              </Select.Option>
              <Select.Option
                displayValue='Payment Account'
                value='payment_account'
              >
                Payment Account
              </Select.Option>
            </Select>
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
