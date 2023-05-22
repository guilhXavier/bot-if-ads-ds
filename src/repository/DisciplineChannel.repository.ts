import { DisciplineChannel, PrismaClient } from '@prisma/client';

export class DisciplineChannelRepository {
  constructor(private readonly prisma: PrismaClient) {}

  public async findByDisciplineId(
    disciplineId: string
  ): Promise<DisciplineChannel> {
    return await this.prisma.disciplineChannel.findUnique({
      where: { disciplineId },
    });
  }

  public async findManyByDisciplineIds(
    disciplineIds: Array<string>
  ): Promise<Array<DisciplineChannel>> {
    return await this.prisma.disciplineChannel.findMany({
      where: { disciplineId: { in: disciplineIds } },
    });
  }

  public async findManyByDisciplineIdsAndDiaryIds(
    disciplineIds: Array<string>,
    diaryIds: Array<number>
  ): Promise<Array<DisciplineChannel>> {
    return await this.prisma.disciplineChannel.findMany({
      where: { disciplineId: { in: disciplineIds }, diaryId: { in: diaryIds } },
    });
  }
}
