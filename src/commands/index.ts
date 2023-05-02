import { BaseInteraction, Collection } from 'discord.js';
import { helloCommand, helloCommandInteraction } from './hello';
import {
  startValidationCommand,
  startValidationCommandInteraction,
} from './validate';
import {
  finishValidationCommand,
  finishValidationCommandInteraction,
} from './finish-validate';
import { helpCommand, helpCommandInteraction } from './help';

type CommandFunction = (interaction: BaseInteraction) => Promise<void>;

const commandDataDefinitions = [
  helloCommand.toJSON(),
  startValidationCommand.toJSON(),
  finishValidationCommand.toJSON(),
  helpCommand.toJSON(),
];

const commandsCollection = new Collection<string, CommandFunction>();

commandsCollection.set(helloCommand.name, helloCommandInteraction);
commandsCollection.set(
  startValidationCommand.name,
  startValidationCommandInteraction
);
commandsCollection.set(
  finishValidationCommand.name,
  finishValidationCommandInteraction
);
commandsCollection.set(helpCommand.name, helpCommandInteraction);

export { commandsCollection, commandDataDefinitions };
