import createCommandAlias from '../../utils/createCommandAlias';

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
