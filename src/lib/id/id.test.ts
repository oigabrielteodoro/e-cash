import { generateId, isValidId } from '.'

describe('id', () => {
  describe('generateId', () => {
    it('should be able generate id successfully', () => {
      const id = generateId()

      expect(isValidId(id)).toBeTruthy()
    })
  })

  describe('isValidId', () => {
    it('should be able return true when id is an id valid', () => {
      expect(isValidId('06e03997-04be-4836-a202-99e87105cf76')).toBeTruthy()
    })

    it('should be able return false when id is an id invalid', () => {
      expect(isValidId('wrong-id')).toBeFalsy()
    })
  })
})
