import Command from './Command';

class CommandAlias extends Command {
  /**
   * @constructor
   * @param {CommandService} service
   * @param {Command} command - The command this is an alias for.
   * @param {String} name
   * @param {String} usage
   * @param {String} snippet
   * @param {String} helpText
   */
  constructor(service, command, name, usage, snippet, helpText) {
    super(service, name, usage, snippet, helpText);
    this.command = command;
  }

  /**
   * Executes this command given a message object and an array of arguments.
   * @param {Message} msg
   * @param {String[]} args
   * @return {Promise<String>} The message that should be displayed to the user.
   */
  async go(msg, args) {
    return this.command.go(msg, args);
  }
}

export default CommandAlias;
