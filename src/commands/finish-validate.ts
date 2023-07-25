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

  console.log(channels);

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
        `Token ${tokenOption} verificado com sucesso. Voce será adicionado aos seus canais respectivos.`
      );

      await addUserToStudentRole(interaction);

      const student = await studentService.getEnrolledStudentByEnrollmentId(
        isValidToken.token?.enrollmentId
      );

      console.log(student);

      const studentDisciplines =
        await enrolledDisciplinesService.getStudentDisciplines(
          student.enrollmentId
        );
      console.log(studentDisciplines);

      const channels = await channelsService.getChannelsByDiaryIds(
        studentDisciplines.map((el: DisciplineEnrollment): number => el.diaryId)
      );
      console.log(channels);

      addUserToProperChannels(interaction, channels);
      addUserNickName(interaction, student);
    } else {
      await interaction.reply(`Falha na verificacão do token ${tokenOption}`);
    }
  } catch (err) {
    console.log(err);
  }
};

export { finishValidationCommand, finishValidationCommandInteraction };
