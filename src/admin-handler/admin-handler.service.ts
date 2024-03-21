import { Injectable, Logger, LoggerService } from '@nestjs/common';

import { AdminActions, AdminState, messages } from '../admins/admins.constants';
import { AdminsService } from '../admins/admins.service';
import { TAdminsActions } from '../admins/admins.types';
import { Admin } from '../admins/entity/admins.entity';
import { BotService } from '../bot/bot.service';
import { GroupsService } from '../groups/groups.service';
import delay from '../utils/delay';

@Injectable()
export class AdminsHandlersService {
  private readonly logger: LoggerService = new Logger(AdminsHandlersService.name);
  private adminActions: TAdminsActions;
  constructor(
    private readonly adminsService: AdminsService,
    private readonly botService: BotService,
    private readonly groupsService: GroupsService,
  ) {}

  async onModuleInit() {
    this.adminActions = {
      [AdminActions.START]: async (text, admin) => this.handleStart(text, admin),
      [AdminActions.KICK]: async (text, admin) => this.handleKick(text, admin),
      [AdminActions.DELETE]: async (text, admin) => this.handleDelete(text, admin),
    };
  }

  async handleTextMessage(text: string, admin: Admin): Promise<void> {
    const { adminState } = admin;
    if (adminState === AdminState.WAITING_FOR_APPROVE) {
      return this.waitingForApproveAction(text, admin);
    }
    return this.adminActions[text as AdminActions](text, admin);
  }

  async handleStart(text: string, { id, telegramId }: Admin) {
    await this.botService.sendMessage(telegramId, messages.START);
    await this.adminsService.updateAdmin(id, { adminState: AdminState.START });
  }

  async handleKick(text: string, { id, telegramId }: Admin) {
    await this.botService.sendMessage(telegramId, messages.KICK);
    await this.adminsService.updateAdmin(id, { adminState: AdminState.WAITING_FOR_APPROVE });
  }

  async waitingForApproveAction(text: string, { id, telegramId }: Admin) {
    const isValidNumber = this.isValidTelegramId(text);
    if (!isValidNumber) {
      return await this.botService.sendMessage(telegramId, messages.NOT_A_NUMBER);
    }
    const message = `${messages.DELETE_ANSWER}${text} ?`;
    const keyboard = [[{ text: AdminActions.DELETE }]];
    await this.botService.sendMessageAndKeyboard(telegramId, message, keyboard);
    await this.adminsService.updateAdmin(id, { telegramIdToDelete: Number(text), adminState: AdminState.START });
  }

  async handleDelete(text: string, { id, telegramId, telegramIdToDelete }: Admin) {
    const groups = await this.groupsService.getAllGroupsId();

    for (const telegramId of groups) {
      const userStatus = await this.botService.getChatMember(telegramId, Number(telegramIdToDelete));

      if (userStatus.status !== 'member') continue;

      await this.botService.banChatMember(telegramId, Number(telegramIdToDelete));
      await this.botService.unbanChatMember(telegramId, Number(telegramIdToDelete));

      await delay();
    }

    await this.botService.sendMessage(telegramId, messages.DELETED_SUCCESSFULLY);
    await this.adminsService.updateAdmin(id, { telegramIdToDelete: 0 });
  }

  private isValidTelegramId(telegramId: string): boolean {
    const regExp = /^[1-9][0-9]{0,9}$/;
    return regExp.test(telegramId);
  }
}
