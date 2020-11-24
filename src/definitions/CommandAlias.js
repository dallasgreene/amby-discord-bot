import Command from './Command';

class CommandAlias extends Command {
  /**
   * @constructor
   * @param {CommandService} service
   * @param {Command} command - The command this is an alias for.
   * @param {String} name
   */
  constructor(service, command, name) {
    super(
      service,
      name,
      `${name} ${command.getUsage().slice(command.getUsage().indexOf(' ') + 1)}`,
      command.getSnippet(),
      command.getHelpText(),
    );
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
