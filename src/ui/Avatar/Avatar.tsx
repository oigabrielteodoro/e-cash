import React, { useState, ImgHTMLAttributes, SyntheticEvent } from 'react'

import * as S from './Avatar.styled'
import { NotFoundAvatar } from './NotFoundAvatar'

type Props = ImgHTMLAttributes<HTMLImageElement>

export function Avatar({ src, onError, ...rest }: Props) {
  const [isError, setIsError] = useState(false)

  function handleOnError(event: SyntheticEvent<HTMLImageElement>) {
    setIsError(true)

    onError && onError(event)
  }

  if (isError) {
    return <NotFoundAvatar />
  }

  return <S.Element src={src} onError={handleOnError} {...rest} />
}
