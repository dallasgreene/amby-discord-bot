import Command from '../../../definitions/Command';

class AddCommand extends Command {
  /**
   * @constructor
   * @param {AmbyModel} model
   */
  constructor(model) {
    super(model, 'add', 'add <person> to the <adam> list',
      'This command currently doesn\'t work. Someday it will',
      '');
  }

  /**
   * Executes the get command given a message object and an array of arguments.
   * @param {Message} msg
   * @param {String[]} args
   * @return {Promise<String>} The message that should be displayed to the user.
   */
  async go(msg, args) {
    return 'I can\'t do that, sorry.';
  }
}

export default AddCommand;
