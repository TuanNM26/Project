import { ValueForgotPassword } from '../dto/redis.dto';

export interface IRedisService {
  setKeyWithExpiration(key: string, value: ValueForgotPassword, expirationSeconds: number): Promise<void>;

  deleteKey(key: string): Promise<void>;

  getValueByKey(key: string): Promise<string | null>;
}

export const IRedisService = Symbol('IRedisService');
