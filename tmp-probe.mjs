import path from 'node:path';
import { PrismaClient } from './lib/generated/prisma/client.ts';

process.env.DATABASE_URL = 'file:' + path.resolve(process.cwd(), 'prisma/dev.db');

const prisma = new PrismaClient();

try {
  const row = await prisma.property.create({
    data: { title: 'Probe', owner: 'Ada', location: 'Lekki', area: '620 sqm' },
  });
  console.log('created', row.id);
} catch (error) {
  console.error(error);
  process.exit(1);
} finally {
  await prisma.$disconnect();
}
