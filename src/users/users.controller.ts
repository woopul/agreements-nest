import { AUTH_TYPE } from '@/iam/authentication/consts/auth-type.const';
import { Auth } from '@/iam/authentication/decodators/auth.decorator';
import { Controller, Get } from '@nestjs/common';

import { UsersRepository } from './users.repository';

@Controller('users')
export class UsersController {
  constructor(private readonly usersRepository: UsersRepository) {}

  @Auth(AUTH_TYPE.None)
  @Get()
  async getAllUsers() {
    return await this.usersRepository.find();
  }
}
