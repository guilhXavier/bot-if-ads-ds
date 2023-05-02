import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

const helpCommand = new SlashCommandBuilder()
  .setName('help')
  .setDescription(
    'Esse comando serve para tirar dúvidas sobre o funcionamento do bot.'
  );

const helpCommandInteraction = async (
  interaction: ChatInputCommandInteraction
): Promise<void> => {
  await interaction.reply(`Under construction...`);
};

export { helpCommand, helpCommandInteraction };
