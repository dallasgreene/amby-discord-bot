import Command from '../../../definitions/Command';

class PrefixCommand extends Command {
  /**
   * @constructor
   * @param {AmbyModel} model
   */
  constructor(model) {
    super(model, 'prefix', 'prefix <new prefix>',
      'Changes the prefix amby uses to recognize commands',
      'Changes the prefix amby uses to recognize commands, should accept pretty much anything except spaces');
  }

  /**
   * Executes the prefix command given a message object and an array of arguments.
   * @param {Message} msg
   * @param {String[]} args
   * @return {Promise<String>} The message that should be displayed to the user.
   */
  async go(msg, args) {
    if (args.length > 1) {
      return 'You can\'t use spaces in your prefix';
    }
    const server = await this.model.getServerById(msg.guild.id);
    if (args.length === 0) {
      const newPrefix = this.getRandomPrefix();
      await server.setPrefix(newPrefix);
      return 'You didn\'t provide a prefix so I made one up. Good luck figuring it out idiot';
    }
    await server.setPrefix(args[0]);
    return `Prefix changed to ${args[0]}`;
  }

  /**
   * Returns a random prefix for Amby to assign the server prefix to.
   * @return {String}
   */
  getRandomPrefix() {
    const possiblePrefixes = ['`', '~', '!', '@', '#', '$', '%', '^', '&', '*', '-', '+', '=', '<', '>', 'shit'];
    return possiblePrefixes[Math.floor(Math.random() * possiblePrefixes.length)];
  }
}

export default PrefixCommand;
