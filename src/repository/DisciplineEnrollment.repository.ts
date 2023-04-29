import { PrismaClient } from '@prisma/client';

export class DisciplineEnrollmentRepository {
  constructor(private readonly prisma: PrismaClient) {}

  public async findManyByEnrollmentId(enrollmentId: string) {
    return await this.prisma.disciplineEnrollment.findMany({
      where: { enrollmentId },
    });
  }
}
