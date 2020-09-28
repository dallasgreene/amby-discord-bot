const { MessageEmbed } = require('discord.js');
const Command = require('../../../definitions/Command');

class CommandsCommand extends Command {
    /**
     * @constructor
     * @param {CommandService} commandService
     * @param {Map<Command>} commandList
     */
    constructor(commandService, commandList) {
        super(commandService, `commands`, `commands <command(optional)>`,
            `Get details on how to use commands`,
            `Specify a command and Amby will tell you how to use it. If you don't specify a command, ` +
            `Amby will give you a list of available commands.`);

        this._commandList = commandList;
    }

    /**
     * Executes the get command given a message object and an array of arguments.
     * @param {Message} msg
     * @param {String[]} args
     * @return {Promise<String | MessageEmbed>} The message that should be displayed to the user.
     */
    async go(msg, args) {
        const cmd = args[0];
        if (args.length > 0) {
            if (this._commandList.hasOwnProperty(cmd)) return this._commandList[cmd].help(msg);
            else return `The ${cmd} command does not exist.`;
        } else {
            const guild = msg.guild;
            const server = this._service.getServerById(guild.id);

            let embedColor = ``;
            if (server.ambyRoleId !== null) {
                const ambyRole = await guild.roles.fetch(server.ambyRoleId, false);
                embedColor = ambyRole.hexColor;
            } else {
                embedColor = `#ff1a1a`;
            }

            let helpMsg = new MessageEmbed()
                .setColor(embedColor)
                .setTitle(`Available Commands:`);

            for (let cmd in this._commandList) {
                if (this._commandList.hasOwnProperty(cmd)) {
                    helpMsg.addField(server.prefix + this._commandList[cmd].usage, this._commandList[cmd].snippet);
                }
            }

            return helpMsg;
        }
    }
}

module.exports = CommandsCommand;
