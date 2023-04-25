import { BaseInteraction, Collection } from 'discord.js';
import { helloCommand, helloCommandInteraction } from './hello';

type CommandFunction = (interaction: BaseInteraction) => Promise<void>;

const commandDataDefinitions = [helloCommand.toJSON()];

const commandsCollection = new Collection<string, CommandFunction>();

commandsCollection.set(helloCommand.name, helloCommandInteraction);

export { commandsCollection, commandDataDefinitions };
