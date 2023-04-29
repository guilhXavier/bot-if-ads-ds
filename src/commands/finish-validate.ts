import {
  ChatInputCommandInteraction,
  GuildMemberRoleManager,
  Role,
  SlashCommandBuilder,
  SlashCommandStringOption,
} from 'discord.js';
import { TokenService } from '../services/token.service';
import { TokenRepository } from '../repository/Token.repository';
import { prisma } from '../config';

const addUserToStudentRole = async (
  interaction: ChatInputCommandInteraction
): Promise<void> => {
  const studentRole = interaction.guild.roles.cache.find(
    (role: Role): boolean => role.name === 'ESTUDANTE'
  );

  await (interaction.member.roles as GuildMemberRoleManager).add(studentRole);
};

const addUserToProperChannels = async (
  interaction: ChatInputCommandInteraction,
  channelIds: Array<string>
): Promise<void> => {
  const x = interaction.guild.channels.edit(channel, data);
};

const finishValidationCommand = new SlashCommandBuilder()
  .setName('finalizar-validacao')
  .setDescription('Esse comando finaliza a validacão do aluno no servidor.')
  .addStringOption(
    (option: SlashCommandStringOption): SlashCommandStringOption =>
      option
        .setName('token')
        .setDescription('Token de validacão')
        .setRequired(true)
  );

const finishValidationCommandInteraction = async (
  interaction: ChatInputCommandInteraction
): Promise<void> => {
  const tokenOption = interaction.options.getString('token');

  const tokenService = new TokenService(new TokenRepository(prisma));

  const isValidToken = await tokenService.validateToken(tokenOption);

  if (isValidToken) {
    await interaction.reply(
      `Token ${tokenOption} verificado com sucesso. Voce será adicionado aos seus canais respectivos.`
    );

    await addUserToStudentRole(interaction);
  } else {
    await interaction.reply(`Falha na verificacão do token ${tokenOption}`);
  }
};

export { finishValidationCommand, finishValidationCommandInteraction };
