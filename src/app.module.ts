import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdminsModule } from './admins/admins.module';
import { AuthModule } from './auth/auth.module';
import { BotModule } from './bot/bot.module';
import config from './configuration/config';
import { GroupsModule } from './groups/groups.module';
import { HealthModule } from './health/health.module';
import { UpdatesModule } from './updates/updates.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => configService.get('POSTGRES_DB_SETTINGS'),
      inject: [ConfigService],
    }),
    HealthModule,
    UpdatesModule,
    BotModule,
    AdminsModule,
    GroupsModule,
    AuthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().exclude('health').forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
