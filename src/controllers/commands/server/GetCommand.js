const Command = require('../../../definitions/Command');

class GetCommand extends Command {
    /**
     * @constructor
     * @param {CommandService} commandService
     */
    constructor(commandService) {
        super(commandService, `get`, `get <info tag>`,
            `This is mostly for dallas to get the snowflakes he needs`,
            ``);
    }

    /**
     * Executes the get command given a message object and an array of arguments.
     * @param {Message} msg
     * @param {String[]} args
     * @return {Promise<String>} The message that should be displayed to the user.
     */
    async go(msg, args) {
        return `Dont use this, its not ready.`;
        if (args[0] === `roleSnow`) {
            const roles = msg.guild.roles;
            const keys = roles.keyArray();
        }
        else if (args[0] === `myRoles`) {

        }
    }
}

module.exports = GetCommand;
