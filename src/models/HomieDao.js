import MongooseDao from './base/MongooseDao';
import DataModel from './base/DataModel';

const createHomieSchema = (mongoose) => (
  mongoose.Schema({
    _id: String,
    isAdmin: Boolean,
    realName: String,
    snarkyResponses: [String],
  }, { collection: 'Server' })
);

class HomieDao extends MongooseDao {
  constructor(mongoose) {
    super(mongoose, 'HomieModel', createHomieSchema);
  }
}

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

  static fromDocument(document) {
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

export default { Homie, HomieDao };
