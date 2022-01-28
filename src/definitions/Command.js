import { MessageEmbed } from 'discord.js';

class Command {
  /**
     * @constructor
     * @param {AmbyModel} model
     * @param {String} name
     * @param {String} usage
     * @param {String} snippet
     * @param {String} helpText
     */
  constructor(model, name, usage, snippet, helpText) {
    this.model = model;
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
    const server = await this.model.getServerById(guild.id);

    let embedColor = '';
    if (server.getAmbyColorRoleId() !== null) {
      const ambyRole = await guild.roles.fetch(server.getAmbyColorRoleId(), false);
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
   * Executes this command given a message object and an array of arguments. This message object
   * comes directly from discord.js: https://discord.js.org/#/docs/main/stable/class/Message .
   * The arguments array is all the "words" which came after the triggering command: For example,
   * `!role my-role color #FF0088` triggers the role command with args
   * ['my-role', 'color', '#FF0088'].
   * Whatever is returned from this method will be sent as a single message by the bot to the
   * channel where the message that triggered this method was received.
   * @param {Message} msg
   * @param {String[]} args - All "words" which came after the triggering command.
   * @throws {Error} If this method has not been overriden by its implementing subclass.
   * @return {Promise<String|MessageEmbed>} The message that should be displayed to the user.
   */
  async go(msg, args) {
    throw new Error('This command did not override the go method.');
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
