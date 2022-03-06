import React, { RefObject } from 'react'
import { FiTag } from 'react-icons/fi'
import { AiOutlineBank, AiOutlineFieldNumber } from 'react-icons/ai'
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { CAIXA, NUBANK } from 'assets'
import { Col, Input, Row, Select, Switch } from 'ui'
import { accountNumberWithDigitMask, agencyNumberWithoutDigitMask } from 'lib'

import { bankAccountSchema, BankAccountFormParams } from './types'
import * as S from './BankAccountForm.styled'

type Props = {
  formRef: RefObject<HTMLButtonElement>
  onSubmit: SubmitHandler<FieldValues>
}

export function BankAccountForm({ formRef, onSubmit }: Props) {
  const form = useForm<BankAccountFormParams>({
    resolver: yupResolver(bankAccountSchema),
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
            <Select
              placeholder='Example: PicPay'
              name='banking_institution'
              label='Banking Institution'
              error={errors.banking_institution?.message}
            >
              <Select.Option displayValue='Nubank' value='nubank'>
                <S.BankOption>
                  <img src={NUBANK} width={40} height={40} />
                  Nubank
                </S.BankOption>
              </Select.Option>
              <Select.Option displayValue='Caixa' value='caixa'>
                <S.BankOption>
                  <img src={CAIXA} width={40} height={40} />
                  Caixa
                </S.BankOption>
              </Select.Option>
            </Select>
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
              label='Do you want to include the sum in the dashboard?'
              {...register('include_sum_on_dashboard')}
            />
          </Col>
          <Col span={24}>
            <Input.TextArea
              label='Description'
              placeholder='A brief description about your bank account'
              error={errors.description?.message}
              maxLength={250}
              rows={5}
              {...register('description')}
            />
          </Col>
        </Row>
        <button ref={formRef} type='submit' hidden>
          Submit
        </button>
      </form>
    </FormProvider>
  )
}
