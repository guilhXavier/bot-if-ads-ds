import {
  ChatInputCommandInteraction,
  GuildMemberRoleManager,
  PermissionFlagsBits,
  PermissionsBitField,
  Role,
  SlashCommandBuilder,
  SlashCommandStringOption,
  GuildMember,
  TextChannel,
} from 'discord.js';
import {
  DisciplineChannel,
  DisciplineEnrollment,
  EnrolledStudent,
} from '@prisma/client';
import { TokenService } from '../services/token.service';
import { TokenRepository } from '../repository/Token.repository';
import { prisma } from '../config';
import { DisciplineChannelService } from '../services/disciplineChannel.service';
import { DisciplineChannelRepository } from '../repository/DisciplineChannel.repository';
import { DisciplineEnrollmentService } from '../services/disciplineEnrollment.service';
import { DisciplineEnrollmentRepository } from '../repository/DisciplineEnrollment.repository';
import { EnrolledStudentService } from '../services/enrolledStudent.service';
import { EnrolledStudentRepository } from '../repository/EnrolledStudent.repository';
import { studentNameFormatter } from '../formatters/studentName';
import { ADS_GENERAL_CHANNELS, TDS_GENERAL_CHANNELS } from '../constants';

const tokenService = new TokenService(new TokenRepository(prisma));

const channelsService = new DisciplineChannelService(
  new DisciplineChannelRepository(prisma)
);

const enrolledDisciplinesService = new DisciplineEnrollmentService(
  new DisciplineEnrollmentRepository(prisma)
);

const studentService = new EnrolledStudentService(
  new EnrolledStudentRepository(prisma)
);

const addToProperGeneralChannel = async (
  interaction: ChatInputCommandInteraction,
  student: EnrolledStudent
): Promise<void> => {
  const channelManager = interaction.guild.channels;
  const member = interaction.member.user.id;
  if (student.enrollmentId.includes('ADS')) {
    const textChannel = channelManager.cache.find(
      (channel) => channel.id === ADS_GENERAL_CHANNELS.generalText
    );
    const updatesChannel = channelManager.cache.find(
      (channel) => channel.id === ADS_GENERAL_CHANNELS.updates
    );

    (textChannel as TextChannel).permissionOverwrites.edit(member, {
      ViewChannel: true,
      SendMessages: true,
    });

    (updatesChannel as TextChannel).permissionOverwrites.edit(member, {
      ViewChannel: true,
      SendMessages: true,
    });

    return;
  }

  const textChannel = channelManager.cache.find(
    (channel) => channel.id === TDS_GENERAL_CHANNELS.generalText
  );
  const updatesChannel = channelManager.cache.find(
    (channel) => channel.id === TDS_GENERAL_CHANNELS.updates
  );

  (textChannel as TextChannel).permissionOverwrites.edit(member, {
    ViewChannel: true,
    SendMessages: true,
  });

  (updatesChannel as TextChannel).permissionOverwrites.edit(member, {
    ViewChannel: true,
    SendMessages: true,
  });

  return;
};

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
  channels: Array<DisciplineChannel>
): Promise<void> => {
  const channelManager = interaction.guild.channels;
  const member = interaction.member.user.id;

  channels.forEach(async (channel: DisciplineChannel): Promise<void> => {
    const cachedChannel = channelManager.cache.find(
      (ch) => ch.id === channel.channelId
    );

    (cachedChannel as TextChannel).permissionOverwrites.edit(member, {
      ViewChannel: true,
      SendMessages: true,
    });
  });
};

const addUserNickName = async (
  interaction: ChatInputCommandInteraction,
  { name }: EnrolledStudent
): Promise<void> => {
  let nickname: string = name;

  if (name.length >= 32) {
    nickname = studentNameFormatter(name);
  }

  (interaction.member as GuildMember).setNickname(nickname);
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
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages);

const finishValidationCommandInteraction = async (
  interaction: ChatInputCommandInteraction
): Promise<void> => {
  const tokenOption = interaction.options.getString('token');

  const token = await tokenService.getTokenByCode(tokenOption);

  const isValidToken = await tokenService.isValidToken(token);
  try {
    if (isValidToken.isValid) {
      await interaction.reply(
        `Token verificado com sucesso. Voce será adicionado aos seus canais respectivos.`
      );

      await addUserToStudentRole(interaction);

      const student = await studentService.getEnrolledStudentByEnrollmentId(
        isValidToken.token?.enrollmentId
      );

      const studentDisciplines =
        await enrolledDisciplinesService.getStudentDisciplines(
          student.enrollmentId
        );

      const channels = await channelsService.getChannelsByDiaryIds(
        studentDisciplines.map((el: DisciplineEnrollment): number => el.diaryId)
      );

      addUserToProperChannels(interaction, channels);
      addToProperGeneralChannel(interaction, student);
      addUserNickName(interaction, student);
    } else {
      await interaction.reply(`Falha na verificacão do token`);
    }
  } catch (err) {
    console.error(err);
  }
};

export { finishValidationCommand, finishValidationCommandInteraction };
