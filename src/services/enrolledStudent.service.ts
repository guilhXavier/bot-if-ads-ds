import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getAllEnrolledStudents = async () => {
  await prisma.$connect();

  const allStudents = await prisma.enrolledStudent.findMany();

  console.log(allStudents);

  await prisma.$disconnect();
};

export { getAllEnrolledStudents };
