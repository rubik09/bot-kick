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

export const messages = {
  START: `Это бот для удаления пользователей из чатов. Чтобы удалить нажми на команду ${AdminActions.KICK}`,
  KICK: `Введите телеграмм айди пользователя которого хотите удалить`,
  NOT_A_NUMBER: `Ввели не цифры! Попробуйте еще раз.`,
  DELETE_ANSWER: `Вы действительно хотите удалить telegramId - `,
  DELETED_SUCCESSFULLY: 'Удаление прошло успешно',
};
