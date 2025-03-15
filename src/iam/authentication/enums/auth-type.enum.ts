export const AUTH_TYPE = {
  Bearer: 'Bearer',
  None: 'None',
} as const;

export type AuthType = (typeof AUTH_TYPE)[keyof typeof AUTH_TYPE];
