import { Module } from '@nestjs/common';

import { GroupHandlerService } from './group-handler.service';
import { BotModule } from '../bot/bot.module';
import { GroupsModule } from '../groups/groups.module';

@Module({
  imports: [GroupsModule, BotModule],
  providers: [GroupHandlerService],
  exports: [GroupHandlerService],
})
export class GroupHandlerModule {}
