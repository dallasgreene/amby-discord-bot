import Help from './util/HelpCommand';

/**
 * A mapping of command names to constructors of aliases which should be created for them.
 * @type {Object}
 */
const commandAliasMapping = {
  commands: [Help],
};

export default commandAliasMapping;
