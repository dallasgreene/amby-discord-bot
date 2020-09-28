const Discord = require("discord.js");
const client = new Discord.Client();

const token = require("./configuration/token_config.json").token;

const StartupService = require('./src/models/StartupService');
const AmbyModel = require('./src/models/AmbyModel');
const CommandService = require('./src/models/CommandService');
const DbService = require('./src/models/DbService');
const ServerDao = require('./src/daos/server/ServerDao');
const AmbyController = require('./src/controllers/AmbyController');

/**
 * Initialize the bot via dependency injection
 * @return {Promise<AmbyController>}
 */
const init = async () => {
    const dbUser = process.argv[2];
    const dbPass = process.argv[3];
    const mongoose = require('mongoose');
    // mongoose.set('useFindAndModify', false);
    await mongoose.connect('mongodb://localhost:27017/', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        user: dbUser,
        pass: dbPass,
        authSource: 'amby-db',
        dbName: 'amby-db'
    });
    const serverDao = new ServerDao(mongoose);
    const dbService = new DbService(serverDao);

    const startupService = new StartupService(dbService);

    await startupService.initCollections();

    const servers = await startupService.getServers();
    const model = new AmbyModel(servers);

    const commandService = new CommandService(dbService, model);

    const something = await commandService.getServerById('default');
    console.log(something)
    const somethingElse = await commandService.getServerById('381401643268308992');
    console.log(somethingElse)

    const commandList = require("./src/controllers/commands/commandList")(commandService);

    // start bot
    client.on(`ready`, () => startupService.handleReadyEvent(client, model));

    return new AmbyController(commandList, model);
};

const main = async () => {
    const controller = await init();

    // checks every message sent to the server
    client.on(`message`, msg => controller.handleMessageEvent(msg));
};

client.login(token);

main();
