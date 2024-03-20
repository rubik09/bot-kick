import { Module } from '@nestjs/common';

import { UpdatesController } from './updates.controller';
import { UpdatesService } from './updates.service';
import { AdminsModule } from '../admins/admins.module';
import { BotModule } from '../bot/bot.module';
import { GroupHandlerModule } from '../group-handler/group-handler.module';
import { GroupsModule } from '../groups/groups.module';

@Module({
  imports: [BotModule, AdminsModule, GroupHandlerModule, GroupsModule],
  controllers: [UpdatesController],
  providers: [UpdatesService],
})
export class UpdatesModule {}
