import {
  ChatInputCommandInteraction,
  PermissionFlagsBits,
  SlashCommandBuilder,
  TextChannel,
} from 'discord.js';
import { DisciplineChannelService } from '../services/disciplineChannel.service';
import { DisciplineChannelRepository } from '../repository/DisciplineChannel.repository';
import { prisma } from '../config';
import { DisciplineChannel } from '@prisma/client';
import { TokenService } from '../services/token.service';
import { TokenRepository } from '../repository/Token.repository';

const resetChannelsCommand = new SlashCommandBuilder()
  .setName('reset-channels')
  .setDescription('This command resets all channels')
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

const resetChannelsInteraction = async (
  interaction: ChatInputCommandInteraction
): Promise<void> => {
  const disciplineService = new DisciplineChannelService(
    new DisciplineChannelRepository(prisma)
  );
  const tokenService = new TokenService(new TokenRepository(prisma));

  const channels = await disciplineService.getAllChannels();

  const channelIds = channels.map(
    (ch: DisciplineChannel): string => ch.channelId
  );

  channelIds.forEach((channel) => {
    const cachedChannel = interaction.guild.channels.cache.find(
      (ch) => ch.id === channel
    );

    (cachedChannel as TextChannel).permissionOverwrites.create(
      cachedChannel.guild.roles.everyone,
      { ViewChannel: false }
    );
  });

  tokenService.deleteAll();
};

export { resetChannelsCommand, resetChannelsInteraction };
