import { MessageEmbed } from 'discord.js';

class Command {
  /**
     * @constructor
     * @param {CommandService} service
     * @param {String} name
     * @param {String} usage
     * @param {String} snippet
     * @param {String} helpText
     */
  constructor(service, name, usage, snippet, helpText) {
    this.service = service;
    this.name = name;
    this.usage = usage;
    this.snippet = snippet;
    this.helpText = helpText;
  }

  /**
     * Returns a MessageEmbed which explains how to use this command.
     * @param {Message} msg
     * @return {MessageEmbed} A response which explains how to use this command.
     */
  async help(msg) {
    const { guild } = msg;
    const server = this.service.getServerById(guild.id);

    let embedColor = '';
    if (server.ambyRoleId !== null) {
      const ambyRole = await guild.roles.fetch(server.ambyRoleId, false);
      embedColor = ambyRole.hexColor;
    } else {
      embedColor = '#ff1a1a';
    }

    const response = new MessageEmbed()
      .setColor(embedColor)
      .setTitle(server.prefix + this.usage);
    if (this.helpText) response.addField('details:', this.helpText);
    else response.addField('details:', this.snippet);

    return response;
  }

  /**
     * Executes this command given a message object and an array of arguments.
     * @param {Message} msg
     * @param {String[]} args
     * @throws {Error} If this method has not been overriden by its subclass.
     * @return {Promise<String>} The message that should be displayed to the user.
     */
  async go(msg, args) {
    throw new Error('Requested command did not override the go method.');
  }

  getName() {
    return this.name;
  }

  getUsage() {
    return this.usage;
  }

  getSnippet() {
    return this.snippet;
  }

  getHelpText() {
    return this.helpText;
  }
}

module.exports = Command;
