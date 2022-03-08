import MongooseDao from '../base/MongooseDao';
import McServer from './McServer';

const mcServerSchema = {
  _id: String,
  alias: { type: String, unique: true },
  host: String,
  port: Number,
  modPack: String,
  createdOn: Date,
};

export class McServerDao extends MongooseDao {
  constructor() {
    super(mcServerSchema, 'McServer', McServer);
  }

  /**
   * Returns the Minecraft server with the given alias.
   * @param {String} alias
   * @return {Promise<McServer>}
   */
  async findByAlias(alias) {
    return new Promise((resolve, reject) => {
      this.dbModel.findOne({ alias }, (err, doc) => {
        if (err !== null) {
          reject(err);
        } else {
          resolve(this.dataModel.fromDocument(doc));
        }
      });
    });
  }
}

export default McServerDao;
