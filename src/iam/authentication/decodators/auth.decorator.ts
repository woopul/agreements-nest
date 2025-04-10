import { SetMetadata } from '@nestjs/common';

import { type AuthType } from '../consts/auth-type.const';

export const AUTH_TYPE_KEY = 'authType';

export const Auth = (...authTypes: AuthType[]) =>
  SetMetadata(AUTH_TYPE_KEY, authTypes);
