import React, { useEffect, useRef } from 'react'
import { FiAlertCircle, FiInfo, FiCheckCircle } from 'react-icons/fi'

import uniqueId from 'lodash/uniqueId'

import { Notification as NotificationProps, NotificationType } from './types'

import * as S from './Notification.styled'
import { EXPIRES_NOTIFICATION_IN_SECONDS, NOTIFICATION_EVENT_NAME } from '.'

type Props = { onExpires: () => void } & Omit<NotificationProps, 'id'>

const icons = {
  info: FiInfo,
  success: FiCheckCircle,
  error: FiAlertCircle,
  warning: FiAlertCircle,
}

export function Notification({ type, message, onExpires }: Props) {
  const timerRef = useRef<number>()

  useEffect(() => {
    if (timerRef.current) return

    timerRef.current = Number(
      setTimeout(() => {
        onExpires()
      }, EXPIRES_NOTIFICATION_IN_SECONDS),
    )
  }, [onExpires])

  const Icon = icons[type]

  return (
    <S.Container>
      <S.IconContainer type={type}>
        <Icon size={20} />
      </S.IconContainer>
      <span>{message}</span>
    </S.Container>
  )
}

const dispatchNotification = (type: NotificationType) => (message: string) => {
  document.dispatchEvent(
    new CustomEvent(NOTIFICATION_EVENT_NAME, {
      detail: { id: `Notification.${uniqueId()}`, type, message },
    }),
  )
}

export const notification = {
  success: dispatchNotification('success'),
  error: dispatchNotification('error'),
  warning: dispatchNotification('warning'),
  info: dispatchNotification('info'),
}
