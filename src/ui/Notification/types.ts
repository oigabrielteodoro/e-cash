export type NotificationType = 'success' | 'error' | 'warning' | 'info'
export type Notification = {
  id: string
  type: NotificationType
  message: string
}

export type NotificationEvent = {
  detail: Notification
}
