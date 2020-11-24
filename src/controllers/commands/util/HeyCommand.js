import Command from '../../../definitions/Command';

class HeyCommand extends Command {
  /**
   * @constructor
   * @param {CommandService} commandService
   */
  constructor(commandService) {
    super(commandService, 'hey', 'hey',
      'You say hey to Amby and you get a response.',
      '');
  }

  /**
   * Executes the hey command given a message object and an array of arguments.
   * @param {Message} msg
   * @param {String[]} args
   * @return {Promise<String>} The message that should be displayed to the user.
   */
  async go(msg, args) {
    return 'leave me alone.';
  }
}

export default HeyCommand;
