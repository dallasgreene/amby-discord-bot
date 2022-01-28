import availableCommands from './availableCommands';
import commandAliasMapping from './commandAliasMapping';
import CommandsCommand from './util/CommandsCommand';

/**
 * Given a command service, initializes all commands available to Amby with the given service and
 * any aliases that have been defined.
 * @param {AmbyModel} model
 * @returns {Object}
 */
const getCommandList = (model) => {
  const commandList = {};

  // initialize all of the commands defined in commandList.json
  availableCommands.forEach((Command) => {
    const command = new Command(model);
    commandList[command.getName()] = command;
  });

  // add the "commands" command separately because it needs to be passed the command list
  const commands = new CommandsCommand(model, commandList);
  commandList[commands.name] = commands;

  // initialize the command aliases defined in commandAliases.json
  Object.keys(commandAliasMapping).forEach((command) => {
    if (Object.prototype.hasOwnProperty.call(commandList, command)) {
      commandAliasMapping[command].forEach((aliasFactory) => {
        const commandAlias = aliasFactory(model, commandList[command]);
        commandList[commandAlias.getName()] = commandAlias;
      });
    } else {
      throw new Error(`Aliases were defined in commandAliasMapping for the ${command} command which was not initialized.`);
    }
  });

  return commandList;
};

export default getCommandList;
