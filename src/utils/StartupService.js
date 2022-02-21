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
}

export default StartupService;
