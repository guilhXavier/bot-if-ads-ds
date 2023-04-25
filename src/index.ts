import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('here');
  // Connect the client
  await prisma.$connect();
  console.log('here1');
  // ... you will write your Prisma Client queries here
  await prisma.token.create({ data: { tokenCode: '100', isExpired: true } });

  const tokens = await prisma.token.findMany();

  console.log(tokens);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
