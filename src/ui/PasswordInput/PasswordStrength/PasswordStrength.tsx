import React from 'react'

import { theme } from 'config'

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

  const requirementValue = getRequirementValue(value)
  const passwordStrength = getPasswordStrength(requirementValue)
  const {
    passwordHasMinLength,
    passwordHasNumeric,
    passwordHasText,
    passwordHasUppercase,
    passwordHasLowercase,
    passwordHasSpecialCharacters,
  } = getFilledRequirements(value)

  const { color, text } = modifiers[passwordStrength]

  const hasSpecialCharacters = !!passwordHasSpecialCharacters
  const hasUppercaseAndLowercase =
    !!passwordHasUppercase && !!passwordHasLowercase
  const hasMinLengthAndNumeric =
    !!passwordHasMinLength && !!passwordHasNumeric && !!passwordHasText

  return (
    <S.Container>
      <S.TextContainer color={color}>
        <span>Password strength</span>
        <span>{requirementValue > 0 && text}</span>
      </S.TextContainer>

      <S.LevelList>
        {requirements.map((requirement) => {
          const isActive = requirementValue > requirement

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

function getFilledRequirements(value: string) {
  return {
    passwordHasUppercase: value.match(/[A-Z]/),
    passwordHasLowercase: value.match(/[a-z]/),
    passwordHasNumeric: value.match(/[0-9]/),
    passwordHasText: value.match(/[a-zA-Z]/),
    passwordHasMinLength: value.length >= 6,
    passwordHasSpecialCharacters: value.match(/[^A-Z a-z0-9]/),
  }
}

function getRequirementValue(value: string) {
  return Object.values(getFilledRequirements(value)).filter(
    (filledRequirement) => !!filledRequirement,
  ).length
}

function getPasswordStrength(
  requirementValue: number,
): 'low' | 'medium' | 'strong' {
  if (requirementValue > 0 && requirementValue <= 2) {
    return 'low'
  }

  if (requirementValue > 2 && requirementValue <= 4) {
    return 'medium'
  }

  if (requirementValue >= 5) {
    return 'strong'
  }

  return 'low'
}
