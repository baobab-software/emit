import { Injectable } from '@nestjs/common';
import { HealthIndicatorService } from '@nestjs/terminus';

import { PrismaService } from '../../database';

@Injectable()
export class PrismaHealthIndicator {
  constructor(
    private readonly healthIndicatorService: HealthIndicatorService,
    private readonly prisma: PrismaService,
  ) {}

  isHealthy(key: string) {
    return this.healthIndicatorService
      .check(key)
      .attempt(async () => {
        await this.prisma.$queryRaw`SELECT 1`;

        return {
          type: 'postgresql',
        };
      })
      .withTimeout(1_500);
  }
}
