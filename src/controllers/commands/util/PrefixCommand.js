const Command = require('../../../definitions/Command');

class PrefixCommand extends Command {
    /**
     * @constructor
     * @param {CommandService} commandService
     */
    constructor(commandService) {
        super(commandService, `prefix`, `prefix <new prefix>`,
            `Changes the prefix amby uses to recognize commands`,
            `Changes the prefix amby uses to recognize commands, should accept pretty much anything except spaces`);
    }

    /**
     * Executes the prefix command given a message object and an array of arguments.
     * @param {Message} msg
     * @param {String[]} args
     * @return {Promise<String>} The message that should be displayed to the user.
     */
    async go(msg, args) {
        if (args.length === 0) {
            const newPrefix = this.getRandomPrefix();
            await this._service.updateServer(msg.guild.id, { prefix: newPrefix });
            return `You didn't provide a prefix so I made one up. Good luck figuring it out idiot`;
        } else if (args.length > 1) {
            return `You can't use spaces in your prefix`;
        } else {
            await this._service.updateServer(msg.guild.id, { prefix: args[0] });
            return `Prefix changed to ${args[0]}`;
        }
    }

    /**
     * Returns a random prefix for Amby to assign the server prefix to.
     * @return {String}
     */
    getRandomPrefix() {
        const possiblePrefixes = [ '`', '~', '!', '@', '#', '$', '%', '^', '&', '*', '-', '+', '=', '<', '>', 'shit' ];
        return possiblePrefixes[Math.floor(Math.random() * possiblePrefixes.length)];
    }
}

module.exports = PrefixCommand;