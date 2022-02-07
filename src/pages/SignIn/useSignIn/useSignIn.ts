import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { pipe } from 'fp-ts/function'
import { tryCatch } from 'fp-ts/TaskEither'
import { toError } from 'fp-ts/Either'
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

  async function handleOnSubmit(data: UseFormData) {
    await pipe(tryCatch(() => createSession(data), toError))()
  }

  return {
    errors,
    isLoading,
    register,
    onSubmit: handleSubmit(handleOnSubmit),
  }
}
