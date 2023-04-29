import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  SlashCommandStringOption,
} from 'discord.js';
import { EnrolledStudentService } from '../services/enrolledStudent.service';
import { EnrolledStudentRepository } from '../repository/EnrolledStudent.repository';
import { prisma } from '../config';
import { emailValidator } from '../validators/emailValidator';
import { MailService } from '../services/mail.service';

const startValidationCommand = new SlashCommandBuilder()
  .setName('iniciar-validacao')
  .setDescription('Esse comando inicia a validacao do aluno no servidor.')
  .addStringOption(
    (option: SlashCommandStringOption): SlashCommandStringOption =>
      option
        .setName('email')
        .setDescription('Seu email academico')
        .setRequired(true)
  );

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

  enrolledStudentService
    .getEnrolledStudentByEmail(emailOption)
    .then(async () => {
      await interaction.reply(
        `Verifique seu email ${emailOption} para completar a validacão.`
      );
      new MailService().sendMail(emailOption);
    })
    .catch(async () => {
      failureHandler(interaction);
    });
};

export { startValidationCommand, startValidationCommandInteraction };
