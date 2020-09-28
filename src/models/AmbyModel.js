
class AmbyModel {
    /**
     * @constructor
     * @param {Map<String, Server>} servers
     */
    constructor(servers) {
        this._servers = servers;
    }

    get servers() {
        return this._servers;
    }

    /**
     * Gets the server with the given server id, or returns the default
     * @param {String} serverId
     * @return {Server}
     */
    getServerById(serverId) {
        if (this._servers.hasOwnProperty(serverId)) {
            return this._servers[serverId];
        } else {
            return this._servers.default;
        }
    }

    /**
     * Updates a server in the model. If the server doesn't already exist, it's added to the model.
     * @param {Server} server
     * @return {void}
     */
    addOrUpdateServer(server) {
        this._servers[server.snowflake] = server;
        console.log(this._servers[server.snowflake])
    }
}

module.exports = AmbyModel;