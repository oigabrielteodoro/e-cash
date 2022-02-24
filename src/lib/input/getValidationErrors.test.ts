import { getValidationErrors } from 'lib'
import * as yup from 'yup'

const exampleSchema = yup.object().shape({
  example: yup.string().required('Example is a required field'),
})

async function mockedFunction(data: unknown) {
  try {
    await exampleSchema.validate(data, {
      abortEarly: false,
    })

    return true
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      const errors = getValidationErrors(error)

      return errors
    }

    return true
  }
}

describe('getValidationErrors', () => {
  it('should be able validate errors', async () => {
    await expect(mockedFunction({})).resolves.toStrictEqual({
      example: 'Example is a required field',
    })
  })

  it('should not be able validate errors when data is correctly', async () => {
    await expect(
      mockedFunction({
        example: 'Example',
      }),
    ).resolves.toBeTruthy()
  })
})
