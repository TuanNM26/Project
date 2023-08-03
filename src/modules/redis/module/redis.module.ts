import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService, registerAs } from '@nestjs/config';
import { Redis } from 'ioredis';
import { IRedisService } from '../service/redis.service.interface';
import { RedisServiceImplementation } from '../service/redis.service.implementation';

const config = registerAs('redis', () => ({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT, 10) || 6379,
  password: process.env.REDIS_PASSWORD || '',
}));

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
  ],
  providers: [
    {
      provide: 'REDIS',
      useFactory: async (configService: ConfigService): Promise<Redis> => {
        const redisConfig = configService.get('redis');
        return new Redis(redisConfig);
      },
      inject: [ConfigService],
    },
    {
      provide: IRedisService,
      useClass: RedisServiceImplementation,
    },
  ],
  exports: ['REDIS', IRedisService],
})
export class RedisModule {}
