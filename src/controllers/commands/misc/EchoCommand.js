import Command from '../../../definitions/Command';

class EchoCommand extends Command {
  /**
   * @constructor
   * @param {AmbyModel} model
   */
  constructor(model) {
    super(model, 'echo', 'echo <message>',
      'Amby repeats your message back to you, unless you\'re trying to @everyone, in which case cut that out',
      '');
  }

  /**
   * Executes this command given a message object and an array of arguments.
   * @param {Message} msg
   * @param {String[]} args
   * @return {Promise<String>} The message that should be displayed to the user.
   */
  async go(msg, args) {
    if (args.includes('@everyone')) return 'stop it.';
    return args.join(' ');
  }
}

export default EchoCommand;
