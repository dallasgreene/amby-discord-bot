class AmbyModel {
  /**
   * @constructor
   * @param {Object} servers
   */
  constructor(servers) {
    this.servers = servers;
  }

  getServers() {
    return this.servers;
  }

  /**
   * Gets the server with the given server id, or returns the default
   * @param {String} serverId
   * @return {Server}
   */
  getServerById(serverId) {
    if (Object.prototype.hasOwnProperty.call(this.servers, serverId)) {
      return this.servers[serverId];
    }
    return this.servers.default;
  }

  /**
   * Updates a server in the model. If the server doesn't already exist, it's added to the model.
   * @param {Server} server
   * @return {void}
   */
  addOrUpdateServer(server) {
    this.servers[server.getSnowflake()] = server;
    console.log(this.servers[server.getSnowflake()]);
  }
}

export default AmbyModel;
