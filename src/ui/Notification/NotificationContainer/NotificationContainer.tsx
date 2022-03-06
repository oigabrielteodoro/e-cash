import React from 'react'
import ReactDOM from 'react-dom'
import { AnimatePresence } from 'framer-motion'

import { Notification } from '../Notification'
import { useNotificationContainer } from '../useNotificationContainer'

import * as S from './NotificationContainer.styled'

export function NotificationContainer() {
  const { notifications, handleRemoveNotification } = useNotificationContainer()

  return ReactDOM.createPortal(
    <S.Container>
      <AnimatePresence>
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            type={notification.type}
            message={notification.message}
            onExpires={() => handleRemoveNotification(notification.id)}
          />
        ))}
      </AnimatePresence>
    </S.Container>,
    document.body,
  )
}
