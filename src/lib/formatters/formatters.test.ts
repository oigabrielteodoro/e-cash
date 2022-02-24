import { decimalFromInt, toDecimal, toFloat, toNumber } from 'lib'

describe('formatters', () => {
  describe('toDecimal', () => {
    it('should be able format successfully', () => {
      expect(toDecimal(1000)).toBe('10,00')
    })

    it('should not be able format when value is null, undefined or invalid', () => {
      expect(toDecimal(null)).toBe('0,00')
      expect(toDecimal(undefined)).toBe('0,00')
      expect(toDecimal('wrong-value')).toBe('0,00')
    })
  })

  describe('decimalFromInt', () => {
    it('should be able format successfully', () => {
      expect(decimalFromInt(1000)).toContain('1.000,00')
    })

    it('should not be able format when value is null, undefined or invalid', () => {
      expect(decimalFromInt(null)).toContain('0,00')
      expect(decimalFromInt(undefined)).toContain('0,00')
      expect(decimalFromInt('wrong-value')).toContain('0,00')
    })
  })

  describe('toNumber', () => {
    it('should be able return number successfully', () => {
      expect(toNumber('1000')).toBe(1000)
    })

    it('should be able return zero when value is null, undefined or invalid', () => {
      expect(toNumber(null)).toBe(0)
      expect(toNumber(undefined)).toBe(0)
      expect(toNumber('wrong-value')).toBe(0)
    })
  })

  describe('toFloat', () => {
    it('should be able return flat number successfully', () => {
      expect(toFloat(1000)).toBe(10)
    })

    it('should be able return zero when value is null, undefined or invalid', () => {
      expect(toFloat(null)).toBe(0)
      expect(toFloat(undefined)).toBe(0)
      expect(toFloat('wrong-value')).toBe(0)
    })
  })
})
