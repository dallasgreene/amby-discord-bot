import { MessageEmbed } from 'discord.js';
import Command from '../../../definitions/Command';

class CommandsCommand extends Command {
  /**
   * @constructor
   * @param {AmbyModel} model
   * @param {Object} commandList the mapping of command names to their corresponding command object.
   */
  constructor(model, commandList) {
    super(model, 'commands', 'commands <command(optional)>',
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
    const commandName = args[0];
    if (args.length > 0) {
      if (Object.prototype.hasOwnProperty.call(this.commandList, commandName)) {
        return this.commandList[commandName].help(msg);
      }
      return `The ${commandName} command does not exist.`;
    }
    const { guild } = msg;
    const server = await this.model.getServerById(guild.id);

    let embedColor = '';
    if (server.getAmbyColorRoleId() !== null) {
      const ambyRole = await guild.roles.fetch(server.getAmbyColorRoleId(), false);
      embedColor = ambyRole.hexColor;
    } else {
      embedColor = '#ff1a1a';
    }

    const helpMsg = new MessageEmbed()
      .setColor(embedColor)
      .setTitle('Available Commands:');

    Object.keys(this.commandList).forEach((command) => {
      if (Object.prototype.hasOwnProperty.call(this.commandList, command)) {
        helpMsg.addField(
          `${server.getPrefix()}${this.commandList[command].usage}`,
          this.commandList[command].snippet,
        );
      }
    });

    return helpMsg;
  }
}

export default CommandsCommand;
