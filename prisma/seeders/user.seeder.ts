import { PrismaClient } from '../../src/generated/prisma/client';

export async function seedUser(prisma: PrismaClient) {
  return prisma.user.upsert({
    where: {
      email: 'developer@emit.local',
    },
    update: {},
    create: {
      id: 'seed_user_owner',
      email: 'developer@emit.local',
      firstName: 'Emit',
      lastName: 'Developer',
    },
  });
}
