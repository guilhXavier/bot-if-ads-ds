import { DisciplineEnrollment } from '@prisma/client';
import { DisciplineEnrollmentRepository } from '../repository/DisciplineEnrollment.repository';

export class DisciplineEnrollmentService {
  constructor(private readonly repository: DisciplineEnrollmentRepository) {}

  public async getStudentDisciplines(
    enrollmentId: string
  ): Promise<Array<DisciplineEnrollment>> {
    return await this.repository.findManyByEnrollmentId(enrollmentId);
  }
}
