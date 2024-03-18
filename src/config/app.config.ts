import { registerAs } from '@nestjs/config';

export default registerAs(
  'app',
  (): Record<string, any> => ({
    jwt: {
      access_secret: process.env.JWT_SECRET || 'SECRET',
      refresh_secret: process.env.JWT_REFRESH_SECRET || 'SECRET',
      access_expiration: process.env.JWT_EXP || '10m',
      refresh_expiration: process.env.JWT_REFRESH_EXP || '1d',
      JWT_IGNORE_EXP: process.env.JWT_IGNORE_EXP || 'false',
    },
  }),
);
