const notImplementedErrorMsg = 'This Data Model did not override a required method.';

/**
 * This class should be overridden by data models for collections in the data base. There should be
 * a custom class created to represent each collection in the db. Required methods are to be able to
 * convert this representation into a document object in the form the database uses.
 */
class DataModel {
  /**
   * @return {*} the id that is the PK for this data.
   */
  getId() {
    throw new Error(notImplementedErrorMsg);
  }

  /**
   * @param {Object} document
   * @return {DataModel} An instance of this class which represents the given document.
   */
  static fromDocument(document) {
    throw new Error(notImplementedErrorMsg);
  }

  /**
   * @return {Object} A document representing this data model.
   */
  toDocument() {
    throw new Error(notImplementedErrorMsg);
  }
}

export default DataModel;
