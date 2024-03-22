import { ChatMember } from 'node-telegram-bot-api';

import { BotId } from './consts';

export default function findBotAdmin(users: ChatMember[]): boolean {
  for (let i = 0; i < users.length; i++) {
    if (users[i].user && users[i].user.id === BotId) {
      return true;
    }
  }
  return false;
}
