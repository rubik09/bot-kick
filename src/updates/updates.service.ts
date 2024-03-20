import { Injectable, Logger, LoggerService } from '@nestjs/common';
import { Message, Update } from 'node-telegram-bot-api';

import { AdminsService } from '../admins/admins.service';
import { BotService } from '../bot/bot.service';
import { GroupHandlerService } from '../group-handler/group-handler.service';

@Injectable()
export class UpdatesService {
  private readonly logger: LoggerService = new Logger(UpdatesService.name);

  constructor(
    private readonly adminService: AdminsService,
    private readonly botService: BotService,
    private readonly groupHandlerService: GroupHandlerService,
  ) {}

  async handleUpdate({ message }: Update) {
    this.logger.log(`Update message: ${JSON.stringify(message)}`);

    const { from } = message;
    const { id: telegramId } = from;
    const chatId = message.chat.id;
    const chatType = message.chat.type;
    const admin = await this.adminService.findAdminByTelegramId(telegramId);

    if (chatType !== 'private') return;

    if (admin) {
      return this.handleMessage(message);
    } else {
      await this.botService.sendMessage(chatId, 'У вас нет доступа к боту');
    }
  }

  async handleMessage(message: Message) {
    try {
      const { text } = message;
      const chatId = message.chat.id;
      const startRegExp = new RegExp(/\/start/);
      const kickRegExp = new RegExp(/\/kick (.+)/);
      const commandStart = text.match(startRegExp);
      const commandKick = text.match(kickRegExp);

      if (commandStart) {
        await this.botService.sendMessage(chatId, 'Чтобы использовать бота отправьте команду  /kick userId');
      } else if (commandKick) {
        await this.groupHandlerService.handleTextMessage(text, Number(commandKick[1]), chatId);
      }
    } catch (e) {
      this.logger.error(`error: ${e}`);
    }
  }
}
