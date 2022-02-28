import type { FieldError } from 'react-hook-form'

export type CreateUser = {
  email: string
  full_name: string
  password: string
  monthly_income: string
  like_be_called: string
  financial_objective: string
}

export type CreateUserStoreState = {
  errors: string[]
  passed: string[]
  status?: 'success' | 'error'
} & Partial<CreateUser>

export type UseCreateUserParams = {
  name?: string
  errors?: {
    [key: string]: FieldError | undefined
  }
}
