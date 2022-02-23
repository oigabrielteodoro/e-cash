import { useEffect } from 'react'
import { FieldError } from 'react-hook-form'

import create from 'zustand'

export type CreateAccountStoreState = {
  email?: string
  full_name?: string
  password?: string
  monthly_income?: string
  financial_objective?: string
  errors: string[]
  passed: string[]
}

type UseCreateAccountParams = {
  name?: string
  errors?: {
    [key: string]: FieldError | undefined
  }
}

const initialState: CreateAccountStoreState = {
  errors: [],
  passed: [],
}

const useStore = create<CreateAccountStoreState>(() => initialState)

export function setState(
  state: Omit<CreateAccountStoreState, 'errors' | 'passed'>,
) {
  useStore.setState(state)
}

export function setErrors(errors: string[]) {
  useStore.setState({ errors })
}

export function passStep(name: string) {
  useStore.setState(({ passed, errors }) => ({
    passed: [...passed, name],
    errors: errors.filter((error) => error !== name),
  }))
}

export function useCreateAccount({
  name = '',
  errors = {},
}: UseCreateAccountParams = {}) {
  const store = useStore((state) => state)

  const isErrored = Object.entries(errors).some(([, error]) => !!error?.message)

  useEffect(() => {
    if (isErrored && !store.errors.includes(name)) {
      setErrors([...store.errors, name])
    }
  }, [name, isErrored, store])

  return {
    ...store,
  }
}
