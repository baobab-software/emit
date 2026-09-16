import { createHash } from 'node:crypto';

import {
  ApiEnvironment,
  PrismaClient,
} from '../../src/generated/prisma/client';

const DEVELOPMENT_API_KEY = 'emit_test_local_development_only';

function hashApiKey(apiKey: string): string {
  return createHash('sha256').update(apiKey).digest('hex');
}

export const seedApiKey = async (
  prisma: PrismaClient,
  projectId: string,
): Promise<any> => {
  return prisma.apiKey.upsert({
    where: {
      id: 'seed_api_key_dev',
    },
    update: {
      keyHash: hashApiKey(DEVELOPMENT_API_KEY),
      revokedAt: null,
    },
    create: {
      id: 'seed_api_key_dev',
      name: 'Local Development',
      prefix: 'emit_test_local',
      keyHash: hashApiKey(DEVELOPMENT_API_KEY),
      environment: ApiEnvironment.TEST,
      projectId,
    },
  });
};

export const developmentApiKey = DEVELOPMENT_API_KEY;
