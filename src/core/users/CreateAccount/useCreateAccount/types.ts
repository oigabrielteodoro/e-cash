import type { FieldError } from 'react-hook-form'

export type CreateUserAccount = {
  email: string
  full_name: string
  password: string
  monthly_income: string
  like_be_called: string
  financial_objective: string
}

export type CreateAccountStoreState = {
  errors: string[]
  passed: string[]
  status?: 'success' | 'error'
} & Partial<CreateUserAccount>

export type UseCreateAccountParams = {
  name?: string
  errors?: {
    [key: string]: FieldError | undefined
  }
}
