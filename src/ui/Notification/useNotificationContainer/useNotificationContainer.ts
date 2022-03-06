import { useEffect, useState } from 'react'

import { NOTIFICATION_EVENT_NAME } from 'ui'
import type { Notification, NotificationEvent } from '../types'

export function useNotificationContainer() {
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    function handleAddNotification(event: unknown) {
      const { detail: notification } = event as NotificationEvent

      if (notification) {
        setNotifications((prevState) => [...prevState, notification])
      }
    }

    document.addEventListener(NOTIFICATION_EVENT_NAME, handleAddNotification)

    return () =>
      document.removeEventListener(
        NOTIFICATION_EVENT_NAME,
        handleAddNotification,
      )
  }, [])

  function handleRemoveNotification(id: string) {
    setNotifications((prevState) =>
      prevState.filter((notification) => notification.id !== id),
    )
  }

  return {
    notifications,
    handleRemoveNotification,
  }
}
