import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonService {
  test() {
    console.log('aa');
    return 'This commoaaaaaaaan test';
  }
}
