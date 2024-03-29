import Command from '../../../definitions/Command';

class EmojiCommand extends Command {
  /**
   * @constructor
   * @param {AmbyModel} model
   */
  constructor(model) {
    super(model, 'emoji', 'emoji <emoji name> [image attachment]',
      'Amby launches a twitch stream of the specified game',
      '');
  }

  /**
   * Executes the play command given a message object and an array of arguments.
   * @param {Message} msg
   * @param {String[]} args
   * @return {Promise<String>} The message that should be displayed to the user.
   */
  async go(msg, args) {
    if (args.length === 1) {
      const name = args[0];
      if (name.includes('-')) return 'Emoji names are not allowed to contain hyphens "-".';
      const { guild } = msg;
      try {
        await guild.emojis.create(msg.attachments.first().url, name);
        return 'Emoji created.';
      } catch (err) {
        if (err.message.toLowerCase().includes('name')) {
          return 'Unable to create emoji, it looks like there\'s a problem with what you named it.';
        } if (err.message.toLowerCase().includes('image')) {
          return 'Unable to create emoji, make sure the image is no larger than 256.0 kb.';
        }
        return 'Unable to create emoji, and I have no idea why. Ask Dallas.';
      }
    }
    return `The emoji command should only be called with a name, like: ${this.usage}`;
  }
}

export default EmojiCommand;
