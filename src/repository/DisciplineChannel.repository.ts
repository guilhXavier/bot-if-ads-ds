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
}
