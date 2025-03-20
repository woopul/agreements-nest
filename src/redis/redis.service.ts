import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private redisClient: Redis;

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    this.redisClient = new Redis({
      host: this.configService.get<string>('REDIS_HOST'),
      port: this.configService.get<number>('REDIS_PORT'),
    });
  }

  onModuleDestroy() {
    return this.redisClient.quit();
  }

  getClient(): Redis {
    return this.redisClient;
  }

  async set(
    key: string,
    value: string,
    expireInSeconds?: number,
  ): Promise<void> {
    if (expireInSeconds) {
      await this.redisClient.set(key, value, 'EX', expireInSeconds);
    } else {
      await this.redisClient.set(key, value);
    }
  }

  async get(key: string): Promise<string | null> {
    return this.redisClient.get(key);
  }

  async del(key: string): Promise<void> {
    await this.redisClient.del(key);
  }
}
