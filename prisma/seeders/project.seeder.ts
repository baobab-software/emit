import { PrismaClient } from '../../src/generated/prisma/client';

export async function seedProject(prisma: PrismaClient, ownerId: string) {
  return prisma.project.upsert({
    where: {
      id: 'seed_project_emit',
    },
    update: {
      ownerId,
    },
    create: {
      id: 'seed_project_emit',
      name: 'Emit Development',
      description: 'Default project for local Emit development.',
      ownerId,
    },
  });
}
