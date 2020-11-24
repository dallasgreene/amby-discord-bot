/**
 * Represents a Discord Server (aka Guild)
 */
class Server {
  /**
   * @constructor
   * @param {String} snowflake
   * @param {String} prefix
   * @param {String} ambyColorRoleId
   * @param {String} ambyHighestRoleId
   * @param {String[]} ambyRoleIds
   */
  constructor(snowflake, prefix, ambyColorRoleId, ambyHighestRoleId, ambyRoleIds) {
    this.snowflake = snowflake;
    this.prefix = prefix;
    this.ambyColorRoleId = ambyColorRoleId;
    this.ambyHighestRoleId = ambyHighestRoleId;
    this.ambyRoleIds = ambyRoleIds;
  }

  getId() {
    return this.snowflake;
  }

  getSnowflake() {
    return this.snowflake;
  }

  getPrefix() {
    return this.prefix;
  }

  getAmbyColorRoleId() {
    return this.ambyColorRoleId;
  }

  getAmbyHighestRoleId() {
    return this.ambyHighestRoleId;
  }

  getAmbyRoleIds() {
    return this.ambyRoleIds;
  }
}

export default Server;
