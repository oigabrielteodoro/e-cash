import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import * as yup from 'yup'

import { useSession } from 'client'

type UseFormData = {
  email: string
  password: string
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
})

export function useSignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UseFormData>({
    resolver: yupResolver(schema),
    shouldFocusError: true,
  })

  const { createSession, isLoading } = useSession()

  function handleOnSubmit(data: UseFormData) {
    createSession(data)
  }

  return {
    errors,
    isLoading,
    register,
    onSubmit: handleSubmit(handleOnSubmit),
  }
}
