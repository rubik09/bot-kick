import { Module } from '@nestjs/common';
import { AdminsModule } from '../admins/admins.module';
import { AdminsHandlersService } from './admin-handler.service';



@Module({
    imports: [AdminsModule],
    providers: [AdminsHandlersService],
    exports: [AdminsHandlersService],
})
export class AdminsHandlersModule { }