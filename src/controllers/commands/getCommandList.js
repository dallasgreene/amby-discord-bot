import availableCommands from './availableCommands';
import commandAliasMapping from './commandAliasMapping';
import Commands from './util/CommandsCommand';

/**
 * Given a command service, initializes all commands available to Amby with the given service and
 * any aliases that have been defined.
 * @param {CommandService} commandService
 * @returns {Object}
 */
const getCommandList = (commandService) => {
  const commandList = {};

  // initialize all of the commands defined in commandList.json
  availableCommands.forEach((Command) => {
    const command = new Command(commandService);
    commandList[command.name] = command;
  });

  // add the "commands" command separately because it needs to be passed the command list
  const commands = new Commands(commandService, commandList);
  commandList[commands.name] = commands;

  // initialize the command aliases defined in commandAliases.json
  Object.keys(commandAliasMapping).forEach((command) => {
    if (Object.prototype.hasOwnProperty.call(commandList, command)) {
      commandAliasMapping[command].forEach((Alias) => {
        const commandAlias = new Alias(commandService, commandList[command]);
        commandList[commandAlias.name] = commandAlias;
      });
    } else {
      throw new Error(`Aliases were defined in commandAliasMapping for the ${command} command which was not initialized.`);
    }
  });

  return commandList;
};

export default getCommandList;
