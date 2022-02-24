import type { ValidationError } from 'yup'

export type Errors = {
  [key: string]: string
}

export function getValidationErrors(validationError: ValidationError): Errors {
  const validationErrors: Errors = {}

  validationError.inner.forEach((error) => {
    if (error.path) {
      validationErrors[error.path] = error.message
    }
  })

  return validationErrors
}
