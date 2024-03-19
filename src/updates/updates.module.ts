import { Module } from '@nestjs/common';

import { UpdatesController } from './updates.controller';
import { UpdatesService } from './updates.service';
import { BotModule } from '../bot/bot.module';
import { AdminsModule } from '../admins/admins.module';
import { AdminsHandlersModule } from '../admin-handler/admin-handler.module';

@Module({
  imports: [BotModule, AdminsModule, AdminsHandlersModule],
  controllers: [UpdatesController],
  providers: [UpdatesService],
})
export class UpdatesModule {}
