import { useEffect } from 'react'
import { useMutation } from 'react-query'
import create from 'zustand'

import { api, ApiError } from 'client'

import type {
  CreateAccountStoreState,
  CreateUserAccount,
  UseCreateAccountParams,
} from './types'

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
  const { mutate: createUser, isLoading } = useMutation<
    unknown,
    ApiError,
    CreateUserAccount
  >({
    mutationFn: (params) => api.post('/users', params),
    onSuccess: () => {
      alert('deu boa')
    },
  })

  const isErrored = Object.entries(errors).some(([, error]) => !!error?.message)

  useEffect(() => {
    if (isErrored && !store.errors.includes(name)) {
      setErrors([...store.errors, name])
    }
  }, [name, isErrored, store])

  return {
    ...store,
    createUser,
    isLoading,
  }
}
