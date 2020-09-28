const commandListPaths = require('../../../configuration/commandList.json');
const commandAliasMapping = require('../../../configuration/commandAliases.json');

const getCommandList = commandService => {
    let commandList = {};

    // initialize all of the commands defined in commandList.json
    for (let path of commandListPaths) {
        const constructor = require(`./${path}`);
        const command = new constructor(commandService);

        commandList[command.name] = command;
    }

    // add the "commands" command separately because it needs to be passed the command list
    const CommandsCommand = require('./util/CommandsCommand');
    const commands = new CommandsCommand(commandService, commandList);
    commandList[commands.name] = commands;

    // initialize the command aliases defined in commandAliases.json
    for (let command in commandAliasMapping) {
        for (let aliasPath of commandAliasMapping[command]) {
            const constructor = require(`./${aliasPath}`);

            let commandAlias;
            if (commandList.hasOwnProperty(command)) {
                commandAlias = new constructor(commandService, commandList[command]);
            } else {
                throw new Error(`Aliases were defined in commandAliases.json ` +
                    `for the ${command} command which was not initialized.`);
            }
            commandList[commandAlias.name] = commandAlias;
        }
    }

    return commandList;
}

module.exports = getCommandList;