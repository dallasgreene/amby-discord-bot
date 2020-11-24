import CommandAlias from '../definitions/CommandAlias';

/**
 * Given a name for the alias, (not the name of the command which is being aliased, the new name
 * which should become an alias) returns a CommandAlias constructor for it.
 * @param {String} name - The name for your alias.
 * @returns A constructor for your command alias class.
 */
const createCommandAlias = (name) => (
  class Alias extends CommandAlias {
    constructor(commandService, commandsCommand) {
      super(commandService, commandsCommand, name);
    }
  }
);

export default createCommandAlias;
