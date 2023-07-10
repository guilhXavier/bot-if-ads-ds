import { DisciplineChannel, PrismaClient } from '@prisma/client';

export class DisciplineChannelRepository {
  constructor(private readonly prisma: PrismaClient) {}

  public async findByDiaryId(diaryId: number): Promise<DisciplineChannel> {
    return await this.prisma.disciplineChannel.findUnique({
      where: { diaryId },
    });
  }

  public async findManyByDiaryIds(
    diaryIds: Array<number>
  ): Promise<Array<DisciplineChannel>> {
    return await this.prisma.disciplineChannel.findMany({
      where: { diaryId: { in: diaryIds } },
    });
  }
}
