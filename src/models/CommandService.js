/* eslint-disable no-underscore-dangle */
import Server from '../definitions/data-models/Server';

class CommandService {
  constructor(dbService, model) {
    this.dbService = dbService;
    this.model = model;
  }

  /**
     * Gets the server that corresponds to the given id.
     * @param {String} id
     * @returns {Server}
     */
  getServerById(id) {
    return this.model.getServerById(id);
  }

  /**
     * Saves a new server to the database and updates the model.
     * @param {Object} server
     * @return {Promise<void>}
     */
  async saveServer(server) {
    const serverDoc = await this.dbService.server.create(server);
    this.model.addOrUpdateServer(new Server(serverDoc._id, serverDoc.prefix,
      serverDoc.ambyColorRoleId, serverDoc.ambyColorRoleId, serverDoc.ambyRoleIds));
  }

  /**
     * Updates a server to the database and updates the model.
     * @param {String} serverId
     * @param {Object} server
     * @return {Promise<void>}
     */
  async updateServer(serverId, server) {
    const serverDoc = await this.dbService.server.update(serverId, server);
    this.model.addOrUpdateServer(new Server(serverDoc._id, serverDoc.prefix,
      serverDoc.ambyColorRoleId, serverDoc.ambyColorRoleId, serverDoc.ambyRoleIds));
    // console.log(this.model._servers)
  }
}

export default CommandService;
