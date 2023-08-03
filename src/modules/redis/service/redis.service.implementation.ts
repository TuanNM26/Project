import { Inject, Logger } from '@nestjs/common';
import { Redis } from 'ioredis';
import { ValueForgotPassword } from '../dto/redis.dto';
import { IRedisService } from './redis.service.interface';

export class RedisServiceImplementation implements IRedisService {
  private readonly logger = new Logger(RedisServiceImplementation.name);

  constructor(@Inject('REDIS') private readonly redisClient: Redis) {}

  async setKeyWithExpiration(key: string, value: ValueForgotPassword, expirationSeconds: number): Promise<void> {
    try {
      const serializedValue = JSON.stringify(value);
      await this.redisClient.set(key, serializedValue, 'EX', expirationSeconds);
    } catch (error) {
      throw error;
    }
  }

  async deleteKey(key: string): Promise<void> {
    try {
      const result = await this.redisClient.del(key);
      if (result === 1) {
        this.logger.log(`Key '${key}' deleted successfully.`);
      } else {
        this.logger.log(`Key '${key}' does not exist.`);
      }
    } catch (error) {
      this.logger.error(`Failed to delete key '${key}' in Redis:`, error);
    }
  }

  async getValueByKey(key: string): Promise<string | null> {
    try {
      const value = await this.redisClient.get(key);
      if (value === null) {
        this.logger.log(`Key '${key}' does not exist.`);
        return null;
      }
      return value;
    } catch (error) {
      this.logger.error(`Failed to retrieve value of key '${key}' from Redis:`, error);
      return null;
    }
  }
}
