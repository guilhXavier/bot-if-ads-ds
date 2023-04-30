import { DisciplineChannel } from '@prisma/client';
import { DisciplineChannelRepository } from '../repository/DisciplineChannel.repository';

export class DisciplineChannelService {
  constructor(private readonly repository: DisciplineChannelRepository) {}

  public async getChannelByDisciplineId(
    disciplineId: string
  ): Promise<DisciplineChannel> {
    return await this.repository.findByDisciplineId(disciplineId);
  }

  public async getChannelsByDisciplineIds(
    disciplineIds: Array<string>
  ): Promise<Array<DisciplineChannel>> {
    return await this.repository.findManyByDisciplineIds(disciplineIds);
  }
}
