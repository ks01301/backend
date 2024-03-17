import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class DatabaseOptionsService implements TypeOrmOptionsFactory {
  private readonly type: string;
  private readonly host: string;
  private readonly port: number;
  private readonly username: string;
  private readonly password: string;
  private readonly database: string;
  private readonly synchronize: boolean;

  constructor(private readonly configService: ConfigService) {
    this.type = this.configService.get<string>('database.type');
    this.host = this.configService.get<string>('database.host');
    this.port = this.configService.get<number>('database.port');
    this.username = this.configService.get<string>('database.username');
    this.password = this.configService.get<string>('database.password');
    this.database = this.configService.get<string>('database.database');
    this.synchronize = this.configService.get<boolean>('database.synchronize');
  }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const typeOrmOptions: TypeOrmModuleOptions = {
      type: this.type as 'postgres',
      host: this.host,
      port: this.port,
      username: this.username,
      password: this.password,
      database: this.database,
      synchronize: this.synchronize,
      logging: false,
      entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
    };

    return typeOrmOptions;
  }
}
