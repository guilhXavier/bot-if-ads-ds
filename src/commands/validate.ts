import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  SlashCommandStringOption,
} from 'discord.js';

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

const startValidationCommandInteraction = async (
  interaction: ChatInputCommandInteraction
): Promise<void> => {
  const emailOption = interaction.options.getString('email');

  await interaction.reply(
    `Verifique seu email ${emailOption} para completar a validacão.`
  );
};

export { startValidationCommand, startValidationCommandInteraction };
