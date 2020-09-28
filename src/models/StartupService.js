const Server = require('../definitions/data-models/Server');
const collectionDefaults = require('../../configuration/collectionDefaults.json');

class StartupService {
    /**
     * @constructor
     * @param {DbService} dbService
     */
    constructor(dbService) {
        this._dbService = dbService;
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
        const guildIds = guildManager.cache.keys();

        for (let guildId of guildIds) {
            const guild = guildManager.cache.get(guildId);
            if (!guild.available) continue;

            const ambyRoleManager = guild.member(ambyUserId).roles;
            const server = {
                _id: guildId,
                ambyColorRoleId: (ambyRoleManager.color) ? ambyRoleManager.color.id : null,
                ambyHighestRoleId: (ambyRoleManager.highest) ? ambyRoleManager.highest.id : null,
                ambyRoleIds: [ ...ambyRoleManager.cache.keys() ]
            };

            let serverDoc = {};
            if (await this._dbService.server.exists(server._id)) {
                serverDoc = await this._dbService.server.update(server._id, server);
            } else {
                server.prefix = null;
                serverDoc = await this._dbService.server.create(server);
            }
            model.addOrUpdateServer(new Server(serverDoc._id, serverDoc.prefix, serverDoc.ambyColorRoleId,
                serverDoc.ambyHighestRoleId, serverDoc.ambyRoleIds));
        }
        console.log(`Ya boi ${client.user.tag} is in this bitch.`);
    }

    /**
     * Initializes all the collections in the database by committing a default document.
     * @return {Promise<void>}
     */
    async initCollections() {
        for (let collection in collectionDefaults) {
            try {
                await this._dbService[collection].create(collectionDefaults[collection]);
            } catch (err) {
                console.log(`WARN: Unable to create default for collection "${collection}", err: ${err.message}\n` +
                    `If this was a duplicate _id error, the collection has already been initialized and this ` +
                    `message can be ignored.`)
            }
        }
    }

    /**
     * Fetches all the servers in the database and returns a map of servers whose keys are their respective snowflakes.
     * @returns {Promise<Map<String, Server>>}
     */
    async getServers() {
        const servers = await this._dbService.server.findAll();

        let serverMapping = {};
        for (let server of servers) {
            serverMapping[server._id] = new Server(server._id, server.prefix, server.ambyColorRoleId,
                server.ambyHighestRoleId, server.ambyRoleIds);
        }

        return serverMapping;
    }
}

module.exports = StartupService;