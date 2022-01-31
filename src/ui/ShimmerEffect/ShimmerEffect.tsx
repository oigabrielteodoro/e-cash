import React, { ReactNode } from 'react'

import range from 'lodash/range'

import * as S from './ShimmerEffect.styled'

export type ShimmerEffectProps = {
  isLoading: boolean
  children?: ReactNode
  size?: 'sm' | 'md' | 'lg'
  variant?: 'image' | 'text'
  count?: number
}

export function ShimmerEffect({
  isLoading,
  children,
  size = 'md',
  variant = 'text',
  count = 1,
}: ShimmerEffectProps) {
  const loaderRange = range(count)

  if (isLoading) {
    return (
      <>
        {loaderRange.map((loaderId) => (
          <S.Container
            size={size}
            variant={variant}
            key={`ShimmerEffect_${loaderId}`}
            data-testid='ShimmerEffect'
          />
        ))}
      </>
    )
  }

  return <>{children}</>
}
