import { BaseInteraction, Collection } from 'discord.js';
import { helloCommand, helloCommandInteraction } from './hello';
import {
  startValidationCommand,
  startValidationCommandInteraction,
} from './validate';

type CommandFunction = (interaction: BaseInteraction) => Promise<void>;

const commandDataDefinitions = [
  helloCommand.toJSON(),
  startValidationCommand.toJSON(),
];

const commandsCollection = new Collection<string, CommandFunction>();

commandsCollection.set(helloCommand.name, helloCommandInteraction);
commandsCollection.set(
  startValidationCommand.name,
  startValidationCommandInteraction
);

export { commandsCollection, commandDataDefinitions };
