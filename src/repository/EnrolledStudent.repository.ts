import { EnrolledStudent, PrismaClient } from '@prisma/client';

export class EnrolledStudentRepository {
  constructor(private readonly prisma: PrismaClient) {}

  public async findByEmail(
    academicEmail: string
  ): Promise<EnrolledStudent | undefined> {
    return await this.prisma.enrolledStudent.findUniqueOrThrow({
      where: { academicEmail },
    });
  }
}
