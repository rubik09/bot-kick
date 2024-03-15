import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Admin } from './entity/admins.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Admin])],
})
export class AdminsModule {}
