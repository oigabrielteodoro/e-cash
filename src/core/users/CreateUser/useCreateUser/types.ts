import type { FieldError } from 'react-hook-form'

export type CreateUser = {
  email: string
  fullName: string
  password: string
  monthlyIncome: string
  likeBeCalled: string
  financialObjective: string
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
