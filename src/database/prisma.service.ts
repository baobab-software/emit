import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor(configService: ConfigService) {
    const connectionString = configService.get<string>('DATABASE_URL');

    if (!connectionString) {
      throw new Error('DATABASE_URL is not defined');
    }

    const adapter = new PrismaPg({
      connectionString,
      connectionTimeoutMillis: 5_000,
    });

    super({ adapter });
  }

  async onModuleInit() {
    this.logger.log('Connecting to PostgreSQL...');

    try {
      await this.$connect();

      await this.$queryRaw`SELECT 1`;

      this.logger.log('PostgreSQL connected');
    } catch (error) {
      this.logger.error('Unable to connect to PostgreSQL');
      throw error;
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
