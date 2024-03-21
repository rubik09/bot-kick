import { Module } from '@nestjs/common';

import { AdminsHandlersService } from './admin-handler.service';
import { AdminsModule } from '../admins/admins.module';
import { BotModule } from '../bot/bot.module';
import { GroupsModule } from '../groups/groups.module';

@Module({
  imports: [AdminsModule, BotModule, GroupsModule],
  providers: [AdminsHandlersService],
  exports: [AdminsHandlersService],
})
export class AdminsHandlersModule {}
