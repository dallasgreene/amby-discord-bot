import MongooseDao from './base/MongooseDao';
import DataModel from './base/DataModel';

/**
 * Represents a Discord user that I know in person.
 */
class Homie extends DataModel {
  /**
   * @constructor
   * @param {String} snowflake
   * @param {Boolean} isAdmin
   * @param {String} realName
   * @param {String[]} snarkyResponses
   */
  constructor(snowflake, isAdmin, realName, snarkyResponses) {
    super();
    this.snowflake = snowflake;
    this.isAdmin = isAdmin;
    this.realName = realName;
    this.snarkyResponses = snarkyResponses;
  }

  static fromDocument(dao, document) {
    return new Homie(document._id, document.isAdmin, document.realName, document.snarkyResponses);
  }

  toDocument() {
    return {
      _id: this.snowflake,
      isAdmin: this.isAdmin,
      realName: this.realName,
      snarkyResponses: this.snarkyResponses,
    };
  }

  getId() {
    return this.snowflake;
  }

  getSnowflake() {
    return this.snowflake;
  }

  getIsAdmin() {
    return this.isAdmin;
  }

  getRealName() {
    return this.realName;
  }

  getSnarkyResponses() {
    return this.snarkyResponses;
  }
}

const homieSchema = {
  _id: String,
  isAdmin: Boolean,
  realName: String,
  snarkyResponses: [String],
};

export class HomieDao extends MongooseDao {
  constructor() {
    super(homieSchema, 'Homie', Homie);
  }
}

export default { Homie, HomieDao };
