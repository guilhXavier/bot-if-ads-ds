import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';

const helloCommand = new SlashCommandBuilder()
  .setName('hello')
  .setDescription('This is a salute.');

const helloCommandInteraction = async (
  interaction: ChatInputCommandInteraction
): Promise<void> => {
  const { user } = interaction;

  await interaction.reply(`Hello, <@${user.id}>!`);
};

export { helloCommand, helloCommandInteraction };
