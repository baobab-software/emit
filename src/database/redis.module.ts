import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { REDIS_CLIENT } from './redis.constants';
import { RedisService } from './redis.service';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: REDIS_CLIENT,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const redisUrl = configService.get<string>('REDIS_URL');

        if (!redisUrl) {
          throw new Error('REDIS_URL is not defined');
        }

        return new Redis(redisUrl, {
          lazyConnect: true,
          connectTimeout: 5_000,

          retryStrategy(times) {
            if (times >= 3) {
              return null;
            }

            return Math.min(times * 500, 2_000);
          },
        });
      },
    },

    RedisService,
  ],
  exports: [REDIS_CLIENT, RedisService],
})
export class RedisModule {}
