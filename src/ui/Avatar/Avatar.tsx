import React, { useState, ImgHTMLAttributes, SyntheticEvent } from 'react'

import * as S from './Avatar.styled'
import { NotFoundAvatar } from './NotFoundAvatar'

export type AvatarProps = {
  src?: string | null
  rotate?: string
  zoom?: string
} & Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'>

export function Avatar({ src, onError, zoom, rotate, ...rest }: AvatarProps) {
  const [isError, setIsError] = useState(false)

  function handleOnError(event: SyntheticEvent<HTMLImageElement>) {
    setIsError(true)

    onError && onError(event)
  }

  if (isError) {
    return <NotFoundAvatar />
  }

  return (
    <S.Element
      src={src || 'unknown'}
      zoom={zoom}
      rotate={rotate}
      onError={handleOnError}
      {...rest}
    />
  )
}
