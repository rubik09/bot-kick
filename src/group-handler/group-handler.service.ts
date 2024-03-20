import { Injectable, Logger, LoggerService } from '@nestjs/common';

import { BotService } from '../bot/bot.service';
import { GroupsService } from '../groups/groups.service';
import delay from '../utils/delay';

@Injectable()
export class GroupHandlerService {
  private readonly logger: LoggerService = new Logger(GroupHandlerService.name);

  constructor(
    private readonly groupsService: GroupsService,
    private readonly botService: BotService,
  ) {}

  async handleTextMessage(text: string, idFromCommand: number, chatId: number): Promise<void> {
    if (!text || !idFromCommand) return;

    const groups = await this.groupsService.getAllGroups();
    let kickedChats = 0;

    for (const group of groups) {
      const { telegramId } = group;
      const userStatus = await this.botService.getChatMember(telegramId, Number(idFromCommand));

      if (userStatus.status !== 'member') continue;

      await this.botService.banChatMember(telegramId, Number(idFromCommand));
      await this.botService.unbanChatMember(telegramId, Number(idFromCommand));

      kickedChats++;
      await delay();
    }
    await this.botService.sendMessage(chatId, `Пользователь был удалён из ${kickedChats} групп`);
    kickedChats = 0;
  }
}
