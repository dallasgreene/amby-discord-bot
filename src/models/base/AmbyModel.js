import { Server, ServerDao } from '../Server';

class AmbyModel {
  /**
   * @constructor
   * @param {Mongoose} mongoose
   */
  constructor(mongoose) {
    this.server = new ServerDao(mongoose);
  }

  /**
   * Gets all the servers stored in the database.
   * @return {Promise<Server[]>}
   */
  getServers() {
    return this.server.findAll().then((docs) => (
      docs.map((doc) => Server.fromDocument(this.server, doc))
    ));
  }

  /**
   * Gets the server with the given server id, or returns the default
   * @param {String} serverId
   * @return {Promise<Server>}
   */
  getServerById(serverId) {
    return this.server.findById(serverId).then((doc) => Server.fromDocument(this.server, doc));
  }

  /**
   * Creates a server in the database.
   * @param {*} args
   * @return {Promise<Server>}
   */
  createServer(...args) {
    const server = new Server(this.server, ...args);
    return server.create();
  }
}

export default AmbyModel;
