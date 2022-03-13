import React, { ReactNode, CSSProperties } from 'react'

import range from 'lodash/range'

import * as S from './ShimmerEffect.styled'

export type ShimmerEffectProps = {
  isLoading: boolean
  children?: ReactNode
  size?: 'sm' | 'md' | 'lg'
  variant?: 'image' | 'text'
  count?: number
  space?: number
  style?: CSSProperties
}

export function ShimmerEffect({
  isLoading,
  children,
  size = 'md',
  variant = 'text',
  count = 1,
  space = 8,
  style,
}: ShimmerEffectProps) {
  const loaderRange = range(count)

  if (isLoading) {
    return (
      <>
        {loaderRange.map((loaderId) => (
          <S.Container
            size={size}
            space={space}
            variant={variant}
            style={style}
            key={`ShimmerEffect_${loaderId}`}
            data-testid='ShimmerEffect'
          />
        ))}
      </>
    )
  }

  return <>{children}</>
}
