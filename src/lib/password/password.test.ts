import { getPasswordRequirementValue } from './password'

import { getPasswordStrength } from '.'

const low = 'a'
const medium = 'Abc'
const strong = 'Abc123$'

describe('password', () => {
  describe('getPasswordStrength', () => {
    it('should be able return status password', () => {
      expect(getPasswordStrength(getPasswordRequirementValue(low))).toBe('low')
      expect(getPasswordStrength(getPasswordRequirementValue(medium))).toBe(
        'medium',
      )
      expect(getPasswordStrength(getPasswordRequirementValue(strong))).toBe(
        'strong',
      )
    })
  })

  describe('getPasswordRequirementValue', () => {
    it('should be able return filled requirement value', () => {
      expect(getPasswordRequirementValue(low)).toBe(2)
      expect(getPasswordRequirementValue(medium)).toBe(3)
      expect(getPasswordRequirementValue(strong)).toBe(6)
    })
  })
})
