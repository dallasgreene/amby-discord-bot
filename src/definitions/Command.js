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
    this._service = service;
    this._name = name;
    this._usage = usage;
    this._snippet = snippet;
    this._helpText = helpText;
  }

  /**
     * Returns a MessageEmbed which explains how to use this command.
     * @param {Message} msg
     * @return {MessageEmbed} A response which explains how to use this command.
     */
  async help(msg) {
    // eslint-disable-next-line prefer-destructuring
    const guild = msg.guild;
    const server = this._service.getServerById(guild.id);

    let embedColor = '';
    if (server.ambyRoleId !== null) {
      const ambyRole = await guild.roles.fetch(server.ambyRoleId, false);
      embedColor = ambyRole.hexColor;
    } else {
      embedColor = '#ff1a1a';
    }

    const response = new MessageEmbed()
      .setColor(embedColor)
      .setTitle(server.prefix + this._usage);
    if (this._helpText) response.addField('details:', this._helpText);
    else response.addField('details:', this._snippet);

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

  get name() {
    return this._name;
  }

  get usage() {
    return this._usage;
  }

  get snippet() {
    return this._snippet;
  }

  get helpText() {
    return this._helpText;
  }
}

module.exports = Command;
