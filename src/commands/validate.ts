import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  SlashCommandStringOption,
  PermissionFlagsBits,
} from 'discord.js';
import { EnrolledStudentService } from '../services/enrolledStudent.service';
import { EnrolledStudentRepository } from '../repository/EnrolledStudent.repository';
import { prisma } from '../config';
import { emailValidator } from '../validators/emailValidator';
import { MailService } from '../services/mail.service';
import { TokenService } from '../services/token.service';
import { TokenRepository } from '../repository/Token.repository';

const startValidationCommand = new SlashCommandBuilder()
  .setName('iniciar-validacao')
  .setDescription('Esse comando inicia a validacao do aluno no servidor.')
  .addStringOption(
    (option: SlashCommandStringOption): SlashCommandStringOption =>
      option
        .setName('email')
        .setDescription('Seu email academico')
        .setRequired(true)
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.ViewChannel);

const failureHandler = async (
  interaction: ChatInputCommandInteraction
): Promise<void> => {
  await interaction.reply(
    'Algo deu errado. Verifique seu email academico e tente novamente.'
  );
};

const startValidationCommandInteraction = async (
  interaction: ChatInputCommandInteraction
): Promise<void> => {
  const emailOption = interaction.options.getString('email');

  if (!emailValidator(emailOption)) {
    return failureHandler(interaction);
  }

  const enrolledStudentService = new EnrolledStudentService(
    new EnrolledStudentRepository(prisma)
  );

  const tokenService = new TokenService(new TokenRepository(prisma));

  try {
    const student = await enrolledStudentService.getEnrolledStudentByEmail(
      emailOption
    );

    await interaction.reply(
      `Verifique seu email ${student.academicEmail} para finalizar a validacão.`
    );

    const token = await tokenService.createToken(student.enrollmentId);

    MailService.sendMail(student.academicEmail, 'Seu token: ' + token);
  } catch (error) {
    failureHandler(interaction);
  }
};

export { startValidationCommand, startValidationCommandInteraction };
