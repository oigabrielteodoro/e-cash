import React from 'react'
import { toast as reactToastify } from 'react-toastify'
import { FiAlertCircle, FiInfo, FiCheckCircle } from 'react-icons/fi'

import * as S from './Toast.styled'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

type Props = {
  message: string
  type: ToastType
}

const icons = {
  info: FiInfo,
  success: FiCheckCircle,
  error: FiAlertCircle,
  warning: FiAlertCircle,
}

function Toast({ message, type }: Props) {
  const Icon = icons[type]

  return (
    <S.Content>
      <S.IconContainer type={type}>
        <Icon size={20} />
      </S.IconContainer>
      <span>{message}</span>
    </S.Content>
  )
}

function ToastContainer() {
  return (
    <S.Container
      position='bottom-left'
      autoClose={100000}
      hideProgressBar
      closeOnClick
      draggable
      pauseOnHover
    />
  )
}

const toast = {
  info: (message: string) =>
    reactToastify.info(<Toast message={message} type='info' />),
  error: (message: string) =>
    reactToastify.error(<Toast message={message} type='error' />),
  warning: (message: string) =>
    reactToastify.warning(<Toast message={message} type='warning' />),
  success: (message: string) =>
    reactToastify.success(<Toast message={message} type='success' />),
}

export { toast, ToastContainer }
export * from 'react-toastify'
