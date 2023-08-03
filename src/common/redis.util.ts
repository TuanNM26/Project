import { TypeOfKey } from '../modules/redis/enum/redis.enum';

export const getKeyRedisByType = (type: string, userId: string): string => {
  switch (type) {
    case TypeOfKey.FORGOT_PASSWORD:
      return `forgot-password-${userId}`;
  }
};
