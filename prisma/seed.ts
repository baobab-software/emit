import 'dotenv/config';

import { PrismaPg } from '@prisma/adapter-pg';

import { PrismaClient } from '../src/generated/prisma/client';
import { developmentApiKey, seedApiKey } from './seeders/api-key.seeder';
import { seedProject } from './seeders/project.seeder';
import { seedUser } from './seeders/user.seeder';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not defined');
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log('🌱 Seeding Emit database...');

  const user = await seedUser(prisma);

  console.log(`✓ User: ${user.email}`);

  const project = await seedProject(prisma, user.id);

  console.log(`✓ Project: ${project.name}`);

  const apiKey = await seedApiKey(prisma, project.id);

  console.log(`✓ API Key: ${apiKey.name}`);

  console.log('');
  console.log('Development API key:');
  console.log(developmentApiKey);

  console.log('');
  console.log('✅ Emit database seeded successfully.');
}

main()
  .catch((error) => {
    console.error('❌ Failed to seed database');
    console.error(error);

    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
