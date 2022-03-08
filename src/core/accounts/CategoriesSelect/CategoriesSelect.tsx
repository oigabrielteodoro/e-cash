import React from 'react'
import { AiOutlineBank, AiOutlineBarChart } from 'react-icons/ai'
import { FiDollarSign } from 'react-icons/fi'
import { MdOutlineSavings, MdPayment } from 'react-icons/md'

import { Select, SelectProps } from 'ui'

import * as S from './CategoriesSelect.styled'

export function CategoriesSelect(props: Omit<SelectProps, 'children'>) {
  return (
    <Select renderOptionElementWhenIsSelected {...props}>
      <Select.Option displayValue='Investments' value='investments'>
        <S.CategoryOption>
          <S.IconContainer>
            <AiOutlineBarChart size={20} />
          </S.IconContainer>
          Investments
        </S.CategoryOption>
      </Select.Option>
      <Select.Option displayValue='Savings' value='savings'>
        <S.CategoryOption>
          <S.IconContainer>
            <MdOutlineSavings size={20} />
          </S.IconContainer>
          Savings
        </S.CategoryOption>
      </Select.Option>
      <Select.Option displayValue='Money' value='money'>
        <S.CategoryOption>
          <S.IconContainer>
            <FiDollarSign size={20} />
          </S.IconContainer>
          Money
        </S.CategoryOption>
      </Select.Option>
      <Select.Option displayValue='Checking Account' value='checking_account'>
        <S.CategoryOption>
          <S.IconContainer>
            <AiOutlineBank size={20} />
          </S.IconContainer>
          Checking Account
        </S.CategoryOption>
      </Select.Option>
      <Select.Option displayValue='Payment Account' value='payment_account'>
        <S.CategoryOption>
          <S.IconContainer>
            <MdPayment size={20} />
          </S.IconContainer>
          Payment Account
        </S.CategoryOption>
      </Select.Option>
    </Select>
  )
}
