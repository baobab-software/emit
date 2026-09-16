import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';

import { PrismaHealthIndicator, RedisHealthIndicator } from './indicators';

@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly prisma: PrismaHealthIndicator,
    private readonly redis: RedisHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.prisma.isHealthy('prisma'),
      () => this.redis.isHealthy('redis'),
    ]);
  }

  @Get('ready')
  @HealthCheck()
  readiness() {
    return this.health.check([
      () => this.prisma.isHealthy('prisma'),
      () => this.redis.isHealthy('redis'),
    ]);
  }

  @Get('live')
  liveness() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}
