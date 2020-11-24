import createCommandAlias from '../../utils/createCommandAlias';

/**
 * Keys of this mapping are the names of existing commands which should have aliases, and their
 * values are an array of alias names they should also go by.
 */
const JSONMapping = {
  commands: ['help'],
};

/**
 * A mapping of command names to constructors of aliases which should be created for them.
 * @type {Object}
 */
const commandAliasMapping = {};

Object.keys(JSONMapping).forEach((command) => {
  commandAliasMapping[command] = JSONMapping[command].map((aliasName) => (
    createCommandAlias(aliasName)
  ));
});

export default commandAliasMapping;
