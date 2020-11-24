import Command from '../../../definitions/Command';

class PlayCommand extends Command {
  /**
   * @constructor
   * @param {CommandService} commandService
   */
  constructor(commandService) {
    super(commandService, 'play', 'play <game>',
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
    const game = args.join(' ');
    if (game.toLowerCase().includes('civ') || game.toLowerCase().includes('fallout')) {
      return `shut up. ${game} is a cool game but like, leave me alone.`;
    }

    return `shut up. ${game} is stupid.`;
  }
}

export default PlayCommand;
