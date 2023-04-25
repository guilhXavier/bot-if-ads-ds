import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';
import {
  Client,
  GatewayIntentBits,
  Events,
  ChatInputCommandInteraction,
  REST,
  Routes,
} from 'discord.js';
import { commandsCollection, commandDataDefinitions } from './commands';

config();

const rest = new REST().setToken(process.env.BOT_TOKEN);

const discordClient = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

const prisma = new PrismaClient();

export const commandsHandler = async (
  interaction: ChatInputCommandInteraction
) => {
  if (!interaction.isChatInputCommand()) return;

  const command = commandsCollection.get(interaction.commandName);

  try {
    await command(interaction);
  } catch (err) {
    console.error(err);
  }
};

async function main() {
  // await prisma.$connect();
  await discordClient.login(process.env.BOT_TOKEN);
  await rest.put(Routes.applicationCommands(process.env.BOT_CLIENT_ID), {
    body: commandDataDefinitions,
  });

  discordClient.on(Events.InteractionCreate, commandsHandler);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
