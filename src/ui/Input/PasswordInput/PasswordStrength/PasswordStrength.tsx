import React from 'react'

import { theme } from 'config'

import {
  getPasswordFilledRequirements,
  getPasswordRequirementValue,
  getPasswordStrength,
} from 'lib'
import { Checkbox } from 'ui'

import * as S from './PasswordStrength.styled'

type Props = {
  value: string
}

const modifiers = {
  low: {
    text: 'Weak',
    color: theme.colors.red[500],
  },
  medium: {
    text: 'Average',
    color: theme.colors.yellow[500],
  },
  strong: {
    text: 'Strong',
    color: theme.colors.green[500],
  },
}

export function PasswordStrength({ value }: Props) {
  const requirements = Array.from(Array(6).keys())

  const passwordRequirementValue = getPasswordRequirementValue(value)
  const passwordStrength = getPasswordStrength(passwordRequirementValue)
  const {
    passwordHasMinLength,
    passwordHasNumeric,
    passwordHasText,
    passwordHasUpperCase,
    passwordHasLowerCase,
    passwordHasSpecialCharacters,
  } = getPasswordFilledRequirements(value)

  const { color, text } = modifiers[passwordStrength]

  const hasSpecialCharacters = !!passwordHasSpecialCharacters
  const hasUppercaseAndLowercase =
    !!passwordHasUpperCase && !!passwordHasLowerCase
  const hasMinLengthAndNumeric =
    !!passwordHasMinLength && !!passwordHasNumeric && !!passwordHasText

  return (
    <S.Container>
      <S.TextContainer color={color}>
        <span>Password strength</span>
        <span>{passwordRequirementValue > 0 && text}</span>
      </S.TextContainer>

      <S.LevelList>
        {requirements.map((requirement) => {
          const isActive = passwordRequirementValue > requirement

          return (
            <S.LevelItem active={isActive} color={color} key={requirement} />
          )
        })}
      </S.LevelList>

      <S.RequirementList>
        <li>
          <Checkbox
            checked={hasMinLengthAndNumeric}
            label='Minimum 6 characters, numbers and letters;'
            readOnly
          />
        </li>
        <li>
          <Checkbox
            checked={hasUppercaseAndLowercase}
            label='Uppercase and lowercase letters;'
            readOnly
          />
        </li>
        <li>
          <Checkbox
            checked={hasSpecialCharacters}
            label='Special characters (!@#$%ˆ&*...)'
            readOnly
          />
        </li>
      </S.RequirementList>
    </S.Container>
  )
}
