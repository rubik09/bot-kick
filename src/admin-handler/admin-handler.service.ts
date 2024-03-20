import { Injectable, Logger, LoggerService } from '@nestjs/common';

import { AdminsService } from '../admins/admins.service';
import { Admin } from '../admins/entity/admins.entity';

@Injectable()
export class AdminsHandlersService {
  private readonly logger: LoggerService = new Logger(AdminsHandlersService.name);
  constructor(private readonly adminsService: AdminsService) {}

  async handleTextMessage(text: string, admin: Admin): Promise<void> {
    const { telegramId } = admin;
  }
}
