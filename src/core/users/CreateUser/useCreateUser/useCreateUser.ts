import { useEffect } from 'react'
import { useMutation } from 'react-query'
import create from 'zustand'

import { Errors } from 'lib'
import { api, ApiError } from 'client'

import type {
  CreateUserStoreState,
  CreateUser,
  UseCreateUserParams,
} from './types'

const initialState: CreateUserStoreState = {
  email: '',
  financialObjective: '',
  fullName: '',
  likeBeCalled: '',
  monthlyIncome: '',
  password: '',
  errors: [],
  passed: [],
  status: undefined,
}

const useStore = create<CreateUserStoreState>(() => initialState)

export function setState(
  state: Omit<CreateUserStoreState, 'errors' | 'passed'>,
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

export function clearState() {
  useStore.setState(() => initialState)
}

const fieldsWithinStep = {
  contact: ['fullName', 'email'],
  password: ['password'],
  profile: ['likeBeCalled', 'monthlyIncome', 'financialObjective'],
}

export function getStepsWithError(errors: Errors) {
  const stepsWithError = Object.entries(fieldsWithinStep)
    .filter(([, fields]) => fields.some((fieldName) => !!errors[fieldName]))
    .map(([stepName]) => stepName)

  return stepsWithError
}

export function useCreateUser({
  name = '',
  errors = {},
}: UseCreateUserParams = {}) {
  const store = useStore((state) => state)
  const { mutateAsync: createUser, isLoading } = useMutation<
    unknown,
    ApiError,
    CreateUser
  >({
    mutationFn: (params) => api.post('/users', params),
    onSuccess: () => {
      useStore.setState({ status: 'success' })
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
    isSuccess: store.status === 'success',
  }
}
