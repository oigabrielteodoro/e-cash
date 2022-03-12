export const passwordHasTextRegex = /[a-zA-Z]/
export const passwordHasNumericRegex = /[0-9]/
export const passwordHasUpperCaseRegex = /[A-Z]/
export const passwordHasLowerCaseRegex = /[a-z]/
export const passwordHasSpecialCharactersRegex = /[^A-Z a-z0-9]/

export function getPasswordFilledRequirements(value: string) {
  return {
    passwordHasUpperCase: value.match(passwordHasUpperCaseRegex),
    passwordHasLowerCase: value.match(passwordHasLowerCaseRegex),
    passwordHasNumeric: value.match(passwordHasNumericRegex),
    passwordHasText: value.match(passwordHasTextRegex),
    passwordHasMinLength: value.length >= 6,
    passwordHasSpecialCharacters: value.match(
      passwordHasSpecialCharactersRegex,
    ),
  }
}

export function getPasswordRequirementValue(value: string) {
  const filledRequirements = getPasswordFilledRequirements(value)
  const filledRequirementsValues = Object.values(filledRequirements)

  return filledRequirementsValues.filter(
    (filledRequirement) => !!filledRequirement,
  ).length
}

export function getPasswordStrength(
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
