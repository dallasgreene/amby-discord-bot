import collectionDefaults from '../../configuration/collectionDefaults.json';
import constants from '../constants';
import { Server } from '../models/Server';

class StartupService {
  /**
   * @constructor
   * @param {AmbyModel} model
   */
  constructor(model) {
    this.model = model;
  }

  /**
   * Handles the ready event triggered by the discord client finishing initialization.
   * @param {Client} client
   * @return {Promise<void>}
   */
  async handleReadyEvent(client) {
    const guildManager = client.guilds;
    const ambyUserId = client.user.id;
    const guildIds = [...guildManager.cache.keys()];

    guildIds.forEach((guildId) => {
      const guild = guildManager.cache.get(guildId);
      if (!guild.available) return;

      this.model.server.exists(guildId)
        .then((serverExists) => {
          console.log('Amby belongs to server:', guildId);
          const ambyRoleManager = guild.member(ambyUserId).roles;
          const ambyColorRoleId = (ambyRoleManager.color) ? ambyRoleManager.color.id : null;
          const ambyHighestRoleId = (ambyRoleManager.highest) ? ambyRoleManager.highest.id : null;
          const ambyRoleIds = [...ambyRoleManager.cache.keys()];

          if (serverExists) {
            return this.model.server.setAmbyRoles(guildId, ambyColorRoleId, ambyHighestRoleId,
              ambyRoleIds);
          }
          const newServer = new Server(guildId, constants.defaultPrefix, ambyColorRoleId,
            ambyHighestRoleId, ambyRoleIds);
          return this.model.server.create(newServer);
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
}

export default StartupService;
