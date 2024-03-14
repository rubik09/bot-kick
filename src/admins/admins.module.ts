import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Admins } from './entity/admins.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Admins])],
})
export class AdminsModule {}
