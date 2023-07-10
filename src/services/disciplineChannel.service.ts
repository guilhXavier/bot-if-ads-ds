import { DisciplineChannel } from '@prisma/client';
import { DisciplineChannelRepository } from '../repository/DisciplineChannel.repository';

export class DisciplineChannelService {
  constructor(private readonly repository: DisciplineChannelRepository) {}

  public async getChannelByDiaryId(
    diaryId: number
  ): Promise<DisciplineChannel> {
    return await this.repository.findByDiaryId(diaryId);
  }

  public async getChannelsByDiaryIds(
    diaryIds: Array<number>
  ): Promise<Array<DisciplineChannel>> {
    return await this.repository.findManyByDiaryIds(diaryIds);
  }
}
