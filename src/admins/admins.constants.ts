export enum AdminRoles {
  ADMIN,
  SUPERADMIN,
}

export enum AdminActions {
  START = '/start',
  KICK = '/kick',
  DELETE = 'Удалить пользователя',
}

export enum AdminState {
  START = 'start',
  WAITING_FOR_APPROVE = 'waitingForApprove',
}
