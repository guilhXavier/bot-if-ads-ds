import { EnrolledStudent } from '@prisma/client';
import { EnrolledStudentRepository } from '../repository/EnrolledStudent.repository';

export class EnrolledStudentService {
  constructor(private readonly repository: EnrolledStudentRepository) {}

  public async getEnrolledStudentByEmail(
    academicEmail: string
  ): Promise<EnrolledStudent | undefined> {
    return await this.repository.findByEmail(academicEmail);
  }

  public async getEnrolledStudentByEnrollmentId(
    enrollmentId: string
  ): Promise<EnrolledStudent> {
    return await this.repository.findByEnrollmentId(enrollmentId);
  }
}
