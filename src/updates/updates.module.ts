import { Module } from '@nestjs/common';

import { UpdatesController } from './updates.controller';
import { UpdatesService } from './updates.service';
import { AdminsHandlersModule } from '../admin-handler/admin-handler.module';
import { AdminsModule } from '../admins/admins.module';
import { GroupsModule } from '../groups/groups.module';

@Module({
  imports: [AdminsModule, AdminsHandlersModule, GroupsModule],
  controllers: [UpdatesController],
  providers: [UpdatesService],
})
export class UpdatesModule {}
