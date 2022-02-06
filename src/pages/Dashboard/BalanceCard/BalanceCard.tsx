import React, { ComponentType, useState, useEffect } from 'react'
import { FiArrowUp } from 'react-icons/fi'
import type { IconBaseProps } from 'react-icons'

import { ShimmerEffect } from 'ui'
import { decimalFromInt, percentFromInt } from 'lib'

import * as S from './BalanceCard.styled'

type Props = {
  title: string
  currentValue: number
  previousValue: number
  icon: ComponentType<IconBaseProps>
}

export function BalanceCard({
  title,
  currentValue,
  previousValue,
  icon: Icon,
}: Props) {
  const [isLoading, setIsLoading] = useState(true)

  const differenceValue = previousValue - currentValue
  const formattedValue = decimalFromInt(currentValue)
  const percentDifferenceValue = percentFromInt(
    differenceValue,
    previousValue,
    {
      hasSuffix: true,
      isRounded: true,
    },
  )

  const status = differenceValue >= 0 ? 'up' : 'down'

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timeout)
  }, [])

  return (
    <S.Card>
      <S.CardContent>
        <ShimmerEffect isLoading={isLoading} count={3} space={12.5} size='lg'>
          <span>{title}</span>
          <strong>{formattedValue}</strong>

          <S.CardStatus status={status}>
            <FiArrowUp size={16} />
            <small>{percentDifferenceValue} since 31/01</small>
          </S.CardStatus>
        </ShimmerEffect>
      </S.CardContent>

      <S.CardIcon>
        <Icon size={23} />
      </S.CardIcon>
    </S.Card>
  )
}
