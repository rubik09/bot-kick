import { Injectable, Logger, LoggerService } from '@nestjs/common';

import { BotService } from '../bot/bot.service';
import { GroupsService } from '../groups/groups.service';
import { modes } from '../utils/consts';
import delay from '../utils/delay';
import { IClientState } from '../utils/interfaces';

const clientsStates: IClientState = {};

@Injectable()
export class AdminsHandlersService {
  private readonly logger: LoggerService = new Logger(AdminsHandlersService.name);

  constructor(
    private readonly groupsService: GroupsService,
    private readonly botService: BotService,
  ) {}

  async handleTextMessage(text: string, chatId: number): Promise<void> {
    this.logger.log('run handleTextMessage');
    let state = clientsStates[chatId];
    if (!state) {
      state = { mode: modes.WAITING_FOR_COMMAND };
      clientsStates[chatId] = state;
    }

    if (state.mode === modes.WAITING_FOR_COMMAND) {
      if (text === '/start') {
        this.logger.log('start command');
        state.mode = modes.WAITING_FOR_KICK_COMMAND;
        await this.botService.sendMessage(chatId, 'Отправьте команду /kick, а затем id пользователя');
      }
    } else if (state.mode === modes.WAITING_FOR_KICK_COMMAND) {
      if (text === '/kick') {
        this.logger.log('kick command');
        state.mode = modes.WAITING_FOR_TELEGRAM_ID;
        await this.botService.sendMessage(chatId, 'Отправьте id пользователя');
      }
    } else if (state.mode === modes.WAITING_FOR_TELEGRAM_ID) {
      if (typeof Number(text) === 'number') {
        try {
          this.logger.log('telegram id and user kick');
          const groups = await this.groupsService.getAllGroups();
          let kickedChats = 0;

          for (const group of groups) {
            const { telegramId } = group;
            const userStatus = await this.botService.getChatMember(telegramId, Number(text));

            if (userStatus.status !== 'member') continue;

            await this.botService.banChatMember(telegramId, Number(text));
            await this.botService.unbanChatMember(telegramId, Number(text));

            kickedChats++;
            await delay();
          }
          if (kickedChats) {
            await this.botService.sendMessage(chatId, `Пользователь был удалён из ${kickedChats} групп`);
          } else {
            await this.botService.sendMessage(chatId, `Пользователь не был найден ни в одной из групп`);
          }
          kickedChats = 0;
        } catch (e) {
          this.logger.error(e);
        }
      } else {
        await this.botService.sendMessage(chatId, `Отправьте id состоящее только из цифр`);
      }
      state.mode = modes.WAITING_FOR_COMMAND;
    }
  }
}
