const CommandAlias = require('../../../definitions/CommandAlias');

class HelpCommand extends CommandAlias {
    /**
     * @constructor
     * @param {CommandsCommand} commandsCommand - An instance of the Commands command.
     * @param {CommandService} commandService
     */
    constructor(commandService, commandsCommand) {
        super(commandService, commandsCommand, `help`, `help <command(optional)>`,
            `Get details on how to use commands`,
            `Specify a command and Amby will tell you how to use it. If you don't specify a command, ` +
            `Amby will give you a list of available commands.`);
    }
}

module.exports = HelpCommand;