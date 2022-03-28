import React, { CSSProperties } from 'react'
import { AiOutlineBank } from 'react-icons/ai'

import * as S from './BankingInstitutionFlag.styled'

type Props = {
  institutionName?: string
  imageUrl?: string
  disabled?: boolean
} & CSSProperties

export function BankingInstitutionFlag({
  institutionName,
  imageUrl,
  disabled,
  ...rest
}: Props) {
  if (imageUrl && institutionName) {
    return (
      <S.Flag
        disabled={disabled}
        style={rest}
        src={imageUrl}
        alt={institutionName}
      />
    )
  }

  return (
    <S.Flag aria-label='institution unknown' style={rest} as='div'>
      <AiOutlineBank size={28} />
    </S.Flag>
  )
}
