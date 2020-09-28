const Server = require('../definitions/data-models/Server');

class CommandService {
    constructor(dbService, model) {
        this._dbService = dbService;
        this._model = model;
    }

    /**
     * Gets the server that corresponds to the given id.
     * @param {String} id
     * @returns {Server}
     */
    getServerById(id) {
        return this._model.getServerById(id);
    }

    /**
     * Saves a new server to the database and updates the model.
     * @param {Object} server
     * @return {Promise<void>}
     */
    async saveServer(server) {
        const serverDoc = await this._dbService.server.create(server);
        this._model.addOrUpdateServer(new Server(serverDoc._id, serverDoc.prefix, serverDoc.ambyColorRoleId,
            serverDoc.ambyColorRoleId, serverDoc.ambyRoleIds));
    }

    /**
     * Updates a server to the database and updates the model.
     * @param {String} serverId
     * @param {Object} server
     * @return {Promise<void>}
     */
    async updateServer(serverId, server) {
        const serverDoc = await this._dbService.server.update(serverId, server);
        this._model.addOrUpdateServer(new Server(serverDoc._id, serverDoc.prefix, serverDoc.ambyColorRoleId,
            serverDoc.ambyColorRoleId, serverDoc.ambyRoleIds));
        // console.log(this._model._servers)
    }
}

module.exports = CommandService;