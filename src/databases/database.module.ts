import { Module } from '@nestjs/common';
import { DatabaseOptionsService } from './service/database.options.service';

@Module({
  providers: [DatabaseOptionsService],
  exports: [DatabaseOptionsService],
})
export class DatabaseModule {}
