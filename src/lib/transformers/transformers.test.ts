import { percentFromInt } from '.'

describe('transfomers', () => {
  describe('percentFromInt', () => {
    it('should be return "33.33" when return value is decimal', () => {
      const result = percentFromInt(8, 24)

      expect(result).toEqual('33.33%')
    })

    it('should be return "25" when return value not is decimal', () => {
      const result = percentFromInt(6, 24)

      expect(result).toEqual('25%')
    })
  })
})
