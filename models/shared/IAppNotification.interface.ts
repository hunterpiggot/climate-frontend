export interface IAppNotification {
  message: string
  status: NotificationStatus
  testid?: string
  otherInfo?: any
}

export enum NotificationStatus {
  success = 'success',
  error = 'error',
  info = 'info',
  warning = 'warning',
  none = 'none'
}

export const SeverityToNotificationStatusMap = new Map<string, NotificationStatus>([
  ['success', NotificationStatus.success],
  ['error', NotificationStatus.error],
  ['info', NotificationStatus.info],
  ['warning', NotificationStatus.warning]
])
