import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

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
    setFocus,
    formState: { errors },
  } = useForm<UseFormData>({
    resolver: yupResolver(schema),
  })

  function handleOnSubmit() {
    alert('Submited')
  }

  return {
    errors,
    setFocus,
    register,
    onSubmit: handleSubmit(handleOnSubmit),
  }
}
