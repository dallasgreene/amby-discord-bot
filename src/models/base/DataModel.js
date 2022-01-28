const notImplementedErrorMsg = 'This Data Model did not override a required method.';

/**
 * This class should be overridden by data models for collections in the data base. There should be
 * a custom class created to represent each collection in the db. Required methods are to be able to
 * convert this representation into a document object in the form the database uses.
 */
class DataModel {
  /**
   * @constructor
   * @param {MongooseDao} dao
   */
  constructor(dao) {
    this.dao = dao;
  }

  /**
   * @return {*} the id that is the PK for this data.
   */
  getId() {
    throw new Error(notImplementedErrorMsg);
  }

  /**
   * @param {MongooseDao} dao
   * @param {Object} document
   * @return {DataModel} An instance of this class which represents the given document.
   */
  static fromDocument(dao, document) {
    throw new Error(notImplementedErrorMsg);
  }

  /**
   * Should mutate this instance to correspond to the given document, then return this instance.
   * @param {Object} document
   * @return {DataModel} This instance which represents the given document.
   */
  syncWithDocument(document) {
    throw new Error(notImplementedErrorMsg);
  }

  /**
   * @return {Object} A document representing this data model.
   */
  toDocument() {
    throw new Error(notImplementedErrorMsg);
  }

  create() {
    return this.dao.create(this.toDocument()).then((doc) => this.syncWithDocument(doc));
  }

  update(obj) {
    return this.dao.update(this.getId(), obj)
      .then((doc) => this.syncWithDocument(doc));
  }

  delete() {
    return this.dao.delete(this.getId());
  }
}

export default DataModel;
