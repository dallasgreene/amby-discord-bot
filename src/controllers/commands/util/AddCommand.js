const Command = require('../../../definitions/Command');

class AddCommand extends Command {
    /**
     * @constructor
     * @param {CommandService} commandService
     */
    constructor(commandService) {
        super(commandService, `add`, `add <person> to the <adam|fuck> list`,
            `This command currently doesn't work. Someday it will`,
            ``);
    }

    /**
     * Executes the get command given a message object and an array of arguments.
     * @param {Message} msg
     * @param {String[]} args
     * @return {Promise<String>} The message that should be displayed to the user.
     */
    async go(msg, args) {
        return `I can't do that, sorry.`;
    }
}

module.exports = AddCommand;
