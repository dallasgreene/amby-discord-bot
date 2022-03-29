import DataModel from '../base/DataModel';

/**
 * Represents a Discord user that I know in person.
 */
class McServer extends DataModel {
  /**
   * @constructor
   * @param {String} instanceId
   * @param {Boolean} alias
   * @param {String} host
   * @param {int} port
   * @param {String} modPack
   * @param {Date} createdOn
   */
  constructor(instanceId, alias, host, port, modPack, createdOn = undefined) {
    super();
    this.instanceId = instanceId;
    this.alias = alias;
    this.host = host;
    this.port = port;
    this.modPack = modPack;
    if (createdOn) {
      this.createdOn = createdOn;
    } else {
      this.createdOn = new Date();
    }
  }

  static fromDocument(document) {
    return new McServer(document._id, document.alias, document.host, document.port,
      document.modPack, document.createdOn);
  }

  toDocument() {
    return {
      _id: this.instanceId,
      alias: this.alias,
      host: this.host,
      port: this.port,
      modPack: this.modPack,
      createdOn: this.createdOn,
    };
  }

  getId() {
    return this.instanceId;
  }

  getInstanceId() {
    return this.instanceId;
  }

  getAlias() {
    return this.alias;
  }

  getHost() {
    return this.host;
  }

  getPort() {
    return this.port;
  }

  getModPack() {
    return this.modPack;
  }

  getCreatedOn() {
    return this.createdOn;
  }
}

export default McServer;
