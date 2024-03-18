import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdminsRepository } from './admins.repository';
import { AdminsService } from './admins.service';
import { Admin } from './entity/admins.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Admin])],
  providers: [AdminsService, AdminsRepository],
})
export class AdminsModule {}
