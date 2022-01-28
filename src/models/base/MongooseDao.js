class MongooseDao {
  /**
   * @constructor
   * @param {Model} mongooseModel
   */
  constructor(mongooseModel) {
    this.dbModel = mongooseModel;
  }

  /**
   * Returns true if there is a document in this collection with the given id, false otherwise.
   * @param {*} id
   * @return {Promise<Boolean>}
   */
  async exists(id) {
    return new Promise((resolve, reject) => {
      this.dbModel.exists({ _id: id }, (err, wasFound) => {
        if (err !== null) reject(new Error(`Error fetching document with id "${id}" from database: ${err}`));
        else resolve(wasFound);
      });
    });
  }

  /**
   * Returns an array of all the documents in this collection.
   * @return {Promise<Object[]>}
   */
  async findAll() {
    return new Promise((resolve, reject) => {
      this.dbModel.find({ }, (err, docs) => {
        if (err !== null) reject(new Error(`Error fetching documents from collection: ${err}`));
        else resolve(docs);
      });
    });
  }

  /**
   * Returns the document that corresponds to the given id in this collection.
   * @param {*} id
   * @return {Promise<Object>}
   */
  async findById(id) {
    return new Promise((resolve, reject) => {
      this.dbModel.findById(id, (err, doc) => {
        if (err !== null) {
          reject(new Error(`Error fetching document with id "${id}" from database: ${err}`));
        } else {
          resolve(doc);
        }
      });
    });
  }

  /**
   * Creates the given document in the database.
   * @param {Object} data
   * @return {Promise<Object>} The document created.
   */
  async create(data) {
    return new Promise((resolve, reject) => {
      this.dbModel.create(data, (err, doc) => {
        if (err !== null) {
          reject(new Error(`Error creating document with id "${data._id}" in database: ${err}`));
        } else {
          resolve(doc);
        }
      });
    });
  }

  /**
   * Updates the document with the given id.
   * @param {*} id
   * @param {Object} data
   * @return {Promise<Object>} The resulting updated document.
   */
  async update(id, data) {
    return new Promise((resolve, reject) => {
      this.dbModel.findByIdAndUpdate(id, { $set: data }, { new: true }, (err, doc) => {
        if (err !== null) {
          reject(new Error(`Error updating document with id "${id}" in database: ${err}`));
        } else {
          resolve(doc);
        }
      });
    });
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
          reject(new Error(`Error deleting document with id "${id}" in database: ${err}`));
        } else {
          resolve();
        }
      });
    });
  }
}

export default MongooseDao;
