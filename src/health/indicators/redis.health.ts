import { Injectable } from '@nestjs/common';
import { HealthIndicatorService } from '@nestjs/terminus';

import { RedisService } from '../../database';

@Injectable()
export class RedisHealthIndicator {
  constructor(
    private readonly healthIndicatorService: HealthIndicatorService,
    private readonly redisService: RedisService,
  ) {}

  isHealthy(key: string) {
    return this.healthIndicatorService
      .check(key)
      .attempt(async () => {
        const response = await this.redisService.client.ping();

        if (response !== 'PONG') {
          throw new Error(`Unexpected Redis response: ${String(response)}`);
        }

        return {
          type: 'redis',
        };
      })
      .withTimeout(1_500);
  }
}
