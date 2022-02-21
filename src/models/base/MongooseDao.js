import mongoose from 'mongoose';

class MongooseDao {
  /**
   * @constructor
   * @param {Object} schema
   * @param {String} collectionName
   * @param {DataModel} dataModel (not an instance, the class extending DataModel)
   */
  constructor(schema, collectionName, dataModel) {
    this.dbModel = mongoose.model(`${collectionName}Model`, mongoose.Schema(schema, { collection: collectionName }));
    this.dataModel = dataModel;
  }

  /**
   * Returns true if there is a document in this collection with the given id, false otherwise.
   * @param {*} id
   * @return {Promise<Boolean>}
   */
  async exists(id) {
    return new Promise((resolve, reject) => {
      this.dbModel.exists({ _id: id }, (err, wasFound) => {
        if (err !== null) reject(err);
        else resolve(wasFound);
      });
    });
  }

  /**
   * Returns an array of all the documents in this collection.
   * @return {Promise<DataModel[]>}
   */
  async findAll() {
    return new Promise((resolve, reject) => {
      this.dbModel.find({ }, (err, docs) => {
        if (err !== null) reject(err);
        else resolve(docs.map((doc) => this.dataModel.fromDocument(doc)));
      });
    });
  }

  /**
   * Returns the document that corresponds to the given id in this collection.
   * @param {*} id
   * @return {Promise<DataModel>}
   */
  async findById(id) {
    return new Promise((resolve, reject) => {
      this.dbModel.findById(id, (err, doc) => {
        if (err !== null) {
          reject(err);
        } else {
          resolve(this.dataModel.fromDocument(doc));
        }
      });
    });
  }

  /**
   * Creates the given document in the database.
   * @param {DataModel} data
   * @return {Promise<DataModel>} The document created.
   */
  async create(data) {
    return new Promise((resolve, reject) => {
      const dataDoc = data.toDocument();
      this.dbModel.create(dataDoc, (err, doc) => {
        if (err !== null) {
          reject(err);
        } else {
          resolve(this.dataModel.fromDocument(doc));
        }
      });
    });
  }

  /**
   * Updates the document with the given id.
   * @param {DataModel} data
   * @return {Promise<DataModel>} The resulting updated document.
   */
  async update(data) {
    return new Promise((resolve, reject) => {
      const dataDoc = data.toDocument();
      delete dataDoc._id;
      this.dbModel.findByIdAndUpdate(data.getId(), { $set: dataDoc }, { new: true }, (err, doc) => {
        if (err !== null) {
          reject(err);
        } else {
          resolve(this.dataModel.fromDocument(doc));
        }
      });
    });
  }

  /**
   * Should only be used by inheriting classes, as this sets fields of the database document
   * directly. External users should use the "update" method to take advantage of the more
   * abstract data model.
   * @param {*} id
   * @param {Object} docObj
   * @return {Promise<DataModel>} The resulting updated document.
   */
  async updateDocument(id, docObj) {
    return new Promise((resolve, reject) => {
      this.dbModel.findByIdAndUpdate(id, { $set: docObj }, { new: true }, (err, doc) => {
        if (err !== null) {
          reject(err);
        } else {
          resolve(this.dataModel.fromDocument(doc));
        }
      });
    });
  }

  /**
   * If the given instance exists in the database already, update it. Otherwise, create the given
   * instance in the database.
   * @param {DataModel} data
   * @return {Promise<DataModel>}
   */
  async createOrUpdate(data) {
    return this.exists(data.getId()).then((dataExists) => (
      (dataExists) ? this.update(data) : this.create(data)
    ));
  }

  /**
   * Deletes the document with the given id.
   * @param {*} id
   * @return {Promise<void>}
   */
  async delete(id) {
    return new Promise((resolve, reject) => {
      this.dbModel.deleteOne({ _id: id }, (err) => {
        if (err !== null) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

export default MongooseDao;
