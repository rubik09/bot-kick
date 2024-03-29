import { Injectable } from '@nestjs/common';
import { ChatMember, KeyboardButton } from 'node-telegram-bot-api';

import { BotProvider } from './bot.provider';

@Injectable()
export class BotService {
  constructor(private readonly bot: BotProvider) {}

  async sendMessage(chatId: number, message: string) {
    await this.bot.sendMessage(chatId, message);
  }

  async getChatMember(chatId: number, userId: number): Promise<ChatMember> {
    return await this.bot.getChatMember(chatId, userId);
  }

  async banChatMember(chatId: number, userId: number) {
    await this.bot.banChatMember(chatId, userId);
  }

  async sendMessageAndKeyboard(chatId: number, text: string, keyboard: KeyboardButton[][]) {
    await this.bot.sendMessageAndKeyboard(chatId, text, keyboard);
  }

  async getChatAdministratorIds(chatId: number): Promise<number[]> {
    const admins = await this.bot.getChatAdministrators(chatId);
    return admins.map(({ user }) => user.id);
  }

  async getMe(): Promise<number> {
    const { id } = await this.bot.getMe();
    return id;
  }
}
