import {
  Inject,
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import Redis from 'ioredis';
import { REDIS_CLIENT } from './redis.constants';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);

  constructor(
    @Inject(REDIS_CLIENT)
    private readonly redis: Redis,
  ) {}

  async onModuleInit() {
    this.logger.log('Connecting to Redis...');

    try {
      await this.redis.connect();

      const response = await this.redis.ping();

      if (response !== 'PONG') {
        throw new Error('Unexpected Redis response from Redis ping');
      }

      this.logger.log('Redis connected');
    } catch (error) {
      this.logger.error('Unable to connect to Redis');

      this.redis.disconnect();

      throw error;
    }
  }

  async onModuleDestroy() {
    if (this.redis.status !== 'end') {
      await this.redis.quit();
    }
  }

  get client(): Redis {
    return this.redis;
  }
}
