import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Group } from './entity/groups.entity';
import { GroupsController } from './groups.controller';
import { GroupsRepository } from './groups.repository';
import { GroupsService } from './groups.service';
import { AuthModule } from '../auth/auth.module';
import { BotModule } from '../bot/bot.module';

@Module({
  imports: [TypeOrmModule.forFeature([Group]), BotModule, AuthModule],
  providers: [GroupsService, GroupsRepository],
  controllers: [GroupsController],
  exports: [GroupsService],
})
export class GroupsModule {}
