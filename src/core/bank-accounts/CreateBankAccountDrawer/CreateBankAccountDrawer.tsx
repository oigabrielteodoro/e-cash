import { CAIXA, NUBANK } from 'assets'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import {
  AiOutlineAlignCenter,
  AiOutlineBank,
  AiOutlineFieldNumber,
} from 'react-icons/ai'
import { FiTag } from 'react-icons/fi'

import { Col, Drawer, Input, Row, Select, Space } from 'ui'
import { AmountInput } from 'ui/Input/AmountInput'

import * as S from './CreateBankAccount.styled'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export function CreateBankAccountDrawer({ isOpen, onClose }: Props) {
  const form = useForm()
  const { register } = form

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      width={700}
      header={
        <Row alignItems='center'>
          <AiOutlineBank size={28} />
          <Space marginLeft='1.6rem'>
            <h3>Add bank account</h3>
          </Space>
        </Row>
      }
    >
      <FormProvider {...form}>
        <form>
          <Row gutter={[32, 32]}>
            <Col span={12}>
              <Input
                label='Name'
                icon={FiTag}
                placeholder='Example: Personal account'
                {...register('name')}
              />
            </Col>
            <Col span={12}>
              <Select
                placeholder='Example: PicPay'
                name='bank_flag'
                label='Banking Institution'
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
              <AmountInput
                name='balance'
                label='Amount balance'
                placeholder='Example: R$ 15,000.00'
              />
            </Col>
            <Col span={12}>
              <Select
                placeholder='Example: Investment'
                name='category'
                label='Category'
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
              <Input
                placeholder='Example: 0000'
                label='Agency (without digit)'
                icon={AiOutlineFieldNumber}
                {...register('agency')}
              />
            </Col>
            <Col span={12}>
              <Input
                placeholder='Example: 000000-0'
                label='Account (with digit)'
                icon={AiOutlineBank}
                {...register('account')}
              />
            </Col>
            <Col span={24}>
              <Input
                label='Description'
                icon={AiOutlineAlignCenter}
                placeholder='A brief description about your account'
                {...register('description')}
              />
            </Col>
          </Row>
        </form>
      </FormProvider>
    </Drawer>
  )
}
