import { isValidUrl } from '.'

describe('url', () => {
  it('should be able return true when url is correctly', () => {
    expect(isValidUrl('https://gabrielteodoro.com')).toBeTruthy()
  })

  it('should be able return false when url is wrong', () => {
    expect(isValidUrl('wrong-url')).toBeFalsy()
  })
})
