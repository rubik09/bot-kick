import { ChatMember } from 'node-telegram-bot-api';

export default function findBotAdmin(users: ChatMember[], botId: number): boolean {
  return users.find((user) => user.user?.id === botId) !== undefined;
}
