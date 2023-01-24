import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { Users2Controller } from './users2/users2.controller';
import { Users23Controller } from './users23/users23.controller';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule],
  controllers: [AppController, Users2Controller, Users23Controller],
  providers: [AppService],
})
export class AppModule {}
