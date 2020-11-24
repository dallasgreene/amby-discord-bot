import { MessageEmbed } from 'discord.js';
import Command from '../../../definitions/Command';

class CommandsCommand extends Command {
  /**
   * @constructor
   * @param {CommandService} commandService
   * @param {Map<Command>} commandList
   */
  constructor(commandService, commandList) {
    super(commandService, 'commands', 'commands <command(optional)>',
      'Get details on how to use commands',
      'Specify a command and Amby will tell you how to use it. If you don\'t specify a command, '
      + 'Amby will give you a list of available commands.');

    this.commandList = commandList;
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
      if (Object.prototype.hasOwnProperty.call(this.commandList, cmd)) {
        return this.commandList[cmd].help(msg);
      }
      return `The ${cmd} command does not exist.`;
    }
    // eslint-disable-next-line prefer-destructuring
    const guild = msg.guild;
    const server = this._service.getServerById(guild.id);
    const defaultServer = this._service.getServerById('default');

    let embedColor = '';
    if (server.getAmbyColorRoleId() !== null) {
      const ambyRole = await guild.roles.fetch(server.getAmbyColorRoleId(), false);
      embedColor = ambyRole.hexColor;
    } else {
      embedColor = '#ff1a1a';
    }

    const prefix = (server.getPrefix() !== null) ? server.getPrefix() : defaultServer.getPrefix();

    const helpMsg = new MessageEmbed()
      .setColor(embedColor)
      .setTitle('Available Commands:');

    for (const cmd in this.commandList) {
      if (Object.prototype.hasOwnProperty.call(this.commandList, cmd)) {
        helpMsg.addField(
          `${prefix}${this.commandList[cmd].usage}`,
          this.commandList[cmd].snippet,
        );
      }
    }

    return helpMsg;
  }
}

export default CommandsCommand;
