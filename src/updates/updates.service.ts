import { Injectable, Logger, LoggerService } from '@nestjs/common';
import { Message, Update } from 'node-telegram-bot-api';

import { AdminsHandlersService } from '../admin-handler/admin-handler.service';
import { AdminsService } from '../admins/admins.service';

@Injectable()
export class UpdatesService {
  private readonly logger: LoggerService = new Logger(UpdatesService.name);

  constructor(
    private readonly adminService: AdminsService,
    private readonly adminsHandlersService: AdminsHandlersService,
  ) {}

  async handleUpdate({ message }: Update) {
    const { from } = message;
    const { id: telegramId } = from;
    const chatType = message.chat.type;
    const admin = await this.adminService.findAdminByTelegramId(telegramId);

    if (admin && chatType === 'private') return this.handleMessage(message);
  }

  async handleMessage(message: Message) {
    const { text, chat } = message;
    const { id } = chat;
    this.logger.log(`Update message: ${JSON.stringify(message)}`);
    await this.adminsHandlersService.handleTextMessage(text, id);
  }
}
