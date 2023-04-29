import { DisciplineChannelRepository } from '../repository/DisciplineChannel.repository';

export class DisciplineChannelService {
  constructor(private readonly repository: DisciplineChannelRepository) {}

  public async getChannelIdByDisciplineId(disciplineId: string) {
    return await this.repository.findByDisciplineId(disciplineId);
  }
}
