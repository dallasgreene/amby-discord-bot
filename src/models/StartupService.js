/* eslint-disable no-underscore-dangle */
import Server from '../definitions/data-models/Server';
import collectionDefaults from '../../configuration/collectionDefaults.json';

class StartupService {
  /**
   * @constructor
   * @param {DbService} dbService
   */
  constructor(dbService) {
    this.dbService = dbService;
  }

  /**
   * Handles the ready event triggered by the discord client finishing initialization.
   * @param {Client} client
   * @param {AmbyModel} model
   * @return {Promise<void>}
   */
  async handleReadyEvent(client, model) {
    const guildManager = client.guilds;
    const ambyUserId = client.user.id;
    const guildIds = [...guildManager.cache.keys()];

    guildIds.forEach((guildId) => {
      const guild = guildManager.cache.get(guildId);
      if (!guild.available) return;

      const ambyRoleManager = guild.member(ambyUserId).roles;
      const server = {
        _id: guildId,
        ambyColorRoleId: (ambyRoleManager.color) ? ambyRoleManager.color.id : null,
        ambyHighestRoleId: (ambyRoleManager.highest) ? ambyRoleManager.highest.id : null,
        ambyRoleIds: [...ambyRoleManager.cache.keys()],
      };

      this.dbService.server.exists(server._id)
        .then((serverExists) => {
          const addServerToModel = (serverDoc) => (
            model.addOrUpdateServer(new Server(serverDoc._id, serverDoc.prefix,
              serverDoc.ambyColorRoleId, serverDoc.ambyHighestRoleId, serverDoc.ambyRoleIds))
          );
          if (serverExists) {
            this.dbService.server.update(server._id, server).then(addServerToModel);
          } else {
            server.prefix = null;
            this.dbService.server.create(server).then(addServerToModel);
          }
        });
    });
  }

  /**
   * Initializes all the collections in the database by committing a default document.
   * @return {Promise<void>}
   */
  async initCollections() {
    return new Promise((resolve) => {
      let currCollection = Promise.resolve();
      Object.keys(collectionDefaults).forEach((collection) => {
        currCollection = currCollection.then(() => (
          this.dbService[collection].create(collectionDefaults[collection])
            .catch((err) => {
              console.log(`WARN: Unable to create default for collection "${collection}", err: ${err.message}\nIf this was a duplicate _id error, the collection has already been initialized and this message can be ignored.`);
            })
        ));
      });
      currCollection.then(() => resolve());
    });
  }

  /**
   * Fetches all the servers in the database and returns a map of servers whose keys are their
   * respective snowflakes.
   * @returns {Promise<Object.<String, Server>>}
   */
  async getServers() {
    const servers = await this.dbService.server.findAll();

    const serverMapping = {};
    servers.forEach((server) => {
      serverMapping[server._id] = new Server(server._id, server.prefix, server.ambyColorRoleId,
        server.ambyHighestRoleId, server.ambyRoleIds);
    });

    return serverMapping;
  }
}

export default StartupService;
