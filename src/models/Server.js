import MongooseDao from './base/MongooseDao';
import DataModel from './base/DataModel';

const serverSchema = {
  _id: String,
  prefix: String,
  ambyColorRoleId: String,
  ambyHighestRoleId: String,
  ambyRoleIds: [String],
};

export class ServerDao extends MongooseDao {
  /**
   * @param {Mongoose} mongoose
   */
  constructor(mongoose) {
    super(mongoose.model('ServerModel', mongoose.Schema(serverSchema, { collection: 'Server' })));
  }
}

/**
 * Represents a Discord Server (aka Guild)
 */
export class Server extends DataModel {
  /**
   * @constructor
   * @param {ServerDao} dao
   * @param {String} snowflake
   * @param {String} prefix
   * @param {String} ambyColorRoleId
   * @param {String} ambyHighestRoleId
   * @param {String[]} ambyRoleIds
   */
  constructor(dao, snowflake, prefix, ambyColorRoleId, ambyHighestRoleId, ambyRoleIds) {
    super(dao);
    this.snowflake = snowflake;
    this.prefix = prefix;
    this.ambyColorRoleId = ambyColorRoleId;
    this.ambyHighestRoleId = ambyHighestRoleId;
    this.ambyRoleIds = ambyRoleIds;
  }

  static fromDocument(dao, document) {
    return new Server(dao, document._id, document.prefix, document.ambyColorRoleId,
      document.ambyHighestRoleId, document.ambyRoleIds);
  }

  syncWithDocument(document) {
    this.snowflake = document._id;
    this.prefix = document.prefix;
    this.ambyColorRoleId = document.ambyColorRoleId;
    this.ambyHighestRoleId = document.ambyHighestRoleId;
    this.ambyRoleIds = document.ambyRoleIds;
    return this;
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

  setPrefix(newValue) {
    return this.update({ prefix: newValue });
  }

  getAmbyColorRoleId() {
    return this.ambyColorRoleId;
  }

  setAmbyColorRoleId(newValue) {
    return this.update({ ambyColorRoleId: newValue });
  }

  getAmbyHighestRoleId() {
    return this.ambyHighestRoleId;
  }

  setAmbyHighestRoleId(newValue) {
    return this.update({ ambyHighestRoleId: newValue });
  }

  getAmbyRoleIds() {
    return this.ambyRoleIds;
  }

  setAmbyRoleIds(newValue) {
    return this.update({ ambyRoleIds: newValue });
  }
}

export default { Server, ServerDao };
