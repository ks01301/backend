import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberModule } from 'src/crud/member/member.module';
import { BoardModule } from 'src/crud/board/board.module';
import { AuthModule } from 'src/crud/auth/auth.module';
import { CommonModule } from 'src/crud/common/common.module';
import { LoginModule } from 'src/crud/login/login.module';
import Configs from '../config/index';
import { DatabaseModule } from 'src/databases/database.module';
import { DatabaseOptionsService } from 'src/databases/service/database.options.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: Configs,
      isGlobal: true,
      envFilePath: `.env.${process.env.ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [DatabaseOptionsService],
      imports: [DatabaseModule],
      useFactory: (databaseOptionsService: DatabaseOptionsService) =>
        databaseOptionsService.createTypeOrmOptions(),
    }),
    MemberModule,
    BoardModule,
    AuthModule,
    CommonModule,
    LoginModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
