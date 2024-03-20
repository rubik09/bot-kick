import { Injectable } from '@nestjs/common';
import TelegramBot from 'node-telegram-bot-api';

import { BotProvider } from './bot.provider';

@Injectable()
export class BotService {
  constructor(private readonly bot: BotProvider) {}

  async sendMessage(chatId: number, message: string) {
    await this.bot.sendMessage(chatId, message);
  }

  async leaveChat(chatId: number) {
    await this.bot.leaveChat(chatId);
  }

  async getChatMember(chatId: number, userId: number): Promise<TelegramBot.ChatMember> {
    return await this.bot.getChatMember(chatId, userId);
  }

  async banChatMember(chatId: number, userId: number) {
    await this.bot.banChatMember(chatId, userId);
  }

  async unbanChatMember(chatId: number, userId: number) {
    await this.bot.unbanChatMember(chatId, userId);
  }
}
