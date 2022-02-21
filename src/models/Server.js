import MongooseDao from './base/MongooseDao';
import DataModel from './base/DataModel';

/**
 * Represents a Discord Server (aka Guild)
 */
export class Server extends DataModel {
  /**
   * @constructor
   * @param {String} snowflake
   * @param {String} prefix
   * @param {String} ambyColorRoleId
   * @param {String} ambyHighestRoleId
   * @param {String[]} ambyRoleIds
   */
  constructor(snowflake, prefix, ambyColorRoleId, ambyHighestRoleId, ambyRoleIds) {
    super();
    this.snowflake = snowflake;
    this.prefix = prefix;
    this.ambyColorRoleId = ambyColorRoleId;
    this.ambyHighestRoleId = ambyHighestRoleId;
    this.ambyRoleIds = ambyRoleIds;
  }

  static fromDocument(document) {
    return new Server(document._id, document.prefix, document.ambyColorRoleId,
      document.ambyHighestRoleId, document.ambyRoleIds);
  }

  toDocument() {
    return {
      _id: this.snowflake,
      prefix: this.prefix,
      ambyColorRoleId: this.ambyColorRoleId,
      ambyHighestRoleId: this.ambyHighestRoleId,
      ambyRoleIds: this.ambyRoleIds,
    };
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

const serverSchema = {
  _id: String,
  prefix: String,
  ambyColorRoleId: String,
  ambyHighestRoleId: String,
  ambyRoleIds: [String],
};

export class ServerDao extends MongooseDao {
  constructor() {
    super(serverSchema, 'Server', Server);
  }

  /**
   * Updates the command prefix for the server with the given id.
   * @param {String} serverId
   * @param {String} prefix
   * @return {Promise<Server>} The new server with the updated prefix.
   */
  async setPrefix(serverId, prefix) {
    return new Promise((resolve, reject) => {
      this.dbModel.findByIdAndUpdate(serverId, { $set: { prefix } }, { new: true }, (err, doc) => {
        if (err !== null) {
          reject(err);
        } else {
          resolve(this.dataModel.fromDocument(doc));
        }
      });
    });
  }

  /**
   * Updates the command prefix for the server with the given id.
   * @param {String} serverId
   * @param {String} ambyColorRoleId
   * @param {String} ambyHighestRoleId
   * @param {String[]} ambyRoleIds
   * @return {Promise<Server>} The new server with the updated roles.
   */
  async setAmbyRoles(serverId, ambyColorRoleId, ambyHighestRoleId, ambyRoleIds) {
    return this.updateDocument(serverId, { ambyColorRoleId, ambyHighestRoleId, ambyRoleIds });
  }
}

export default { Server, ServerDao };
