import { Injectable, Logger, LoggerService } from '@nestjs/common';
import { Message, Update } from 'node-telegram-bot-api';

import { AdminsHandlersService } from '../admin-handler/admin-handler.service';
import { AdminsService } from '../admins/admins.service';
import { Admin } from '../admins/entity/admins.entity';
import { BotService } from '../bot/bot.service';

@Injectable()
export class UpdatesService {
  private readonly logger: LoggerService = new Logger(UpdatesService.name);

  constructor(
    private readonly adminService: AdminsService,
    private readonly adminsHandlerService: AdminsHandlersService,
    private readonly botService: BotService,
  ) {}

  async handleUpdate({ message }: Update) {
    const { from } = message;
    const { id: telegramId } = from;
    const chatId = message.chat.id;
    const admin = await this.adminService.findAdminByTelegramId(telegramId);

    if (admin) {
      return this.handleMessage(message, admin);
    } else {
      await this.botService.sendMessage(chatId, 'У вас нет доступа к боту');
    }
  }

  async handleMessage(message: Message, admin: Admin) {
    const { text } = message;

    this.logger.log(`Update message: ${JSON.stringify(message)}`);
    await this.adminsHandlerService.handleTextMessage(text, admin);
  }
}
