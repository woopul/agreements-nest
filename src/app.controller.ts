import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { ActiveUser } from './iam/authentication/decodators/active-user.decorator';
import { ActiveUserData } from './iam/authentication/interfaces/active-user-data.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/test')
  test(@ActiveUser() user: ActiveUserData): string {
    console.log('ActiveUser', user);
    return 'Test OK';
  }
}
