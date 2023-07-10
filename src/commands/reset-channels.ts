import {
  ChatInputCommandInteraction,
  PermissionFlagsBits,
  SlashCommandBuilder,
} from 'discord.js';
import { DisciplineChannelService } from '../services/disciplineChannel.service';
import { DisciplineChannelRepository } from '../repository/DisciplineChannel.repository';
import { prisma } from '../config';
import { DisciplineChannel } from '@prisma/client';

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

  const channels = await disciplineService.getAllChannels();

  const channelIds = channels.map(
    (ch: DisciplineChannel): string => ch.channelId
  );

  channelIds.forEach((channel) => {
    const cachedChannel = interaction.guild.channels.cache.find(
      (ch) => ch.id === channel
    );

    setTimeout(() => {
      cachedChannel.edit({ permissionOverwrites: [] });
    }, 500);
  });
};

export { resetChannelsCommand, resetChannelsInteraction };
