import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    console.log(process.env.POSTGRES_HOST);
    return 'Hello World!';
  }
  getTest(): string {
    console.log(process.env.POSTGRES_HOST);
    return 'Hello Worasdfld!';
  }
}
