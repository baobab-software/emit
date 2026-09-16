import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  try {
    const app = await NestFactory.create(AppModule);

    app.enableShutdownHooks();

    const configService = app.get(ConfigService);
    const port = configService.get<number>('PORT', 3000);

    await app.listen(port);

    logger.log(`Emit API running on port ${port}`);
  } catch (error) {
    logger.error('Emit failed to start');

    if (error instanceof Error) {
      logger.error(error.message);
    }

    process.exit(1);
  }
}

void bootstrap();
