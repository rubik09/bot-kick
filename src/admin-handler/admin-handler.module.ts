import { Module } from '@nestjs/common';

import { AdminsHandlersService } from './admin-handler.service';
import { AdminsModule } from '../admins/admins.module';

@Module({
  imports: [AdminsModule],
  providers: [AdminsHandlersService],
  exports: [AdminsHandlersService],
})
export class AdminsHandlersModule {}
