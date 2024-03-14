import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Groups } from './entity/groups.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Groups])],
})
export class GroupsModule {}
