import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  SlashCommandStringOption,
} from 'discord.js';

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

  await interaction.reply(`Token ${tokenOption} verificado com sucesso.`);
};

export { finishValidationCommand, finishValidationCommandInteraction };
