import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';

import { AdminsModule } from './admins/admins.module';
import { BotModule } from './bot/bot.module';
import config from './configuration/config';
import { GroupsModule } from './groups/groups.module';
import { HealthModule } from './health/health.module';
import { UpdatesModule } from './updates/updates.module';
import { GlobalExceptionFilter } from './utils/filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    HealthModule,
    UpdatesModule,
    BotModule,
    AdminsModule,
    GroupsModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().exclude('health').forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
