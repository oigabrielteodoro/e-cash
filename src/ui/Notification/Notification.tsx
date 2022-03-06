import React, { useEffect } from 'react'
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

export function Notification({ type, title, onExpires }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onExpires()
    }, EXPIRES_NOTIFICATION_IN_SECONDS)

    return () => clearTimeout(timer)
  }, [onExpires])

  const Icon = icons[type]

  return (
    <S.Container type={type}>
      <S.IconContainer>
        <Icon size={20} />
      </S.IconContainer>
      <span>{title}</span>
    </S.Container>
  )
}

function dispatchNotification(type: NotificationType) {
  return function (message: string) {
    document.dispatchEvent(
      new CustomEvent(NOTIFICATION_EVENT_NAME, {
        detail: { id: uniqueId(), type, title: message },
      }),
    )
  }
}

export const notification = {
  success: dispatchNotification('success'),
  error: dispatchNotification('error'),
  warning: dispatchNotification('warning'),
  info: dispatchNotification('info'),
}
