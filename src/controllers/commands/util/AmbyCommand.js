import Command from '../../../definitions/Command';

class AmbyCommand extends Command {
  /**
   * @constructor
   * @param {CommandService} commandService
   */
  constructor(commandService) {
    super(commandService, 'amby', 'amby <init>',
      'Meta commands for amby.',
      '');
  }

  /**
   * Executes the amby command given a message object and an array of arguments.
   * @param {Message} msg
   * @param {String[]} args
   * @return {Promise<String>} The message that should be displayed to the user.
   */
  async go(msg, args) {
    return 'not implemented.';
  }
}

export default AmbyCommand;
