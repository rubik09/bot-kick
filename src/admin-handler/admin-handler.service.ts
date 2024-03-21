import { Injectable, Logger, LoggerService } from '@nestjs/common';

import { AdminActions, AdminState } from '../admins/admins.constants';
import { AdminsService } from '../admins/admins.service';
import { TAdminsActions } from '../admins/admins.types';
import { Admin } from '../admins/entity/admins.entity';
import { BotService } from '../bot/bot.service';
import { GroupsService } from '../groups/groups.service';

@Injectable()
export class AdminsHandlersService {
  private readonly logger: LoggerService = new Logger(AdminsHandlersService.name);
  private adminActions: TAdminsActions;
  constructor(
    private readonly adminsService: AdminsService,
    private readonly botService: BotService,
    private readonly groupsService: GroupsService,
  ) {}

  async OnModuleInit() {
    this.adminActions = {
      [AdminActions.START]: async (text, admin) => this.handleStart(text, admin),
      [AdminActions.KICK]: async (text, admin) => this.handleKick(text, admin),
      [AdminActions.DELETE]: (text, admin) => this.handleDelete(text, admin),
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
    const message = `Это бот для удаления пользователей из чатов. Чтобы удалить нажми на команду ${AdminActions.KICK}`;
    await this.botService.sendMessage(telegramId, message);
    await this.adminsService.updateAdmin(id, { adminState: AdminState.START });
  }

  async handleKick(text: string, { id, telegramId }: Admin) {
    const message = `Введите телеграмм айди пользователя которого хотите удалить`;
    await this.botService.sendMessage(telegramId, message);
    await this.adminsService.updateAdmin(id, { adminState: AdminState.WAITING_FOR_APPROVE });
  }

  async waitingForApproveAction(text: string, { id, telegramId }: Admin) {
    const isValidNumber = this.isValidTelegramId(text);
    if (!isValidNumber) {
      const message = `Ввели не цифры! Попробуйте еще раз.`;
      return await this.botService.sendMessage(telegramId, message);
    }
    const message = `Вы действительно хотите удалить telegramId - ${text} ?`;
    const keyboard = [[{ text: AdminActions.DELETE }]];
    await this.botService.sendMessageAndKeyboard(telegramId, message, keyboard);
    await this.adminsService.updateAdmin(id, { telegramIdToDelete: Number(text) });
  }

  async handleDelete(text: string, { id, telegramId, telegramIdToDelete }: Admin) {
    const groups = await this.groupsService.getAllGroups();
    
    //логика удаления
    await this.botService.sendMessage(id, 'Удаление прошло успешно');
    await this.adminsService.updateAdmin(id, { adminState: AdminState.START, telegramIdToDelete: 0 });
  }

  private isValidTelegramId(telegramId: string): boolean {
    const regExp = /^[1-9][0-9]{0,9}$/;
    return regExp.test(telegramId);
  }
}
