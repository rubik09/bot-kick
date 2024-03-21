import { Module } from '@nestjs/common';

import { UpdatesController } from './updates.controller';
import { UpdatesService } from './updates.service';
import { AdminsHandlersModule } from '../admin-handler/admin-handler.module';
import { AdminsModule } from '../admins/admins.module';
import { BotModule } from '../bot/bot.module';

@Module({
  imports: [BotModule, AdminsModule, AdminsHandlersModule],
  controllers: [UpdatesController],
  providers: [UpdatesService],
})
export class UpdatesModule {}
