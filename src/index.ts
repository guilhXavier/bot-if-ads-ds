import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';
import { Client, ClientOptions, GatewayIntentBits } from 'discord.js';

config();

const discordClient = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

const prisma = new PrismaClient();

async function main() {
  // Connect the client
  await prisma.$connect();
  await discordClient.login(process.env.BOT_TOKEN);
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
