import Discord from 'discord.js';
import fs from 'fs';
import mongoose from 'mongoose';
import StartupService from './models/StartupService';
import AmbyModel from './models/AmbyModel';
import CommandService from './models/CommandService';
import DbService from './models/DbService';
import ServerDao from './daos/server/ServerDao';
import AmbyController from './controllers/AmbyController';
import getCommandList from './controllers/commands/getCommandList';

const token = fs.readFileSync('./configuration/token_config').toString('utf8');
const client = new Discord.Client();

/**
 * Initialize the bot via dependency injection
 * @return {Promise<AmbyController>}
 */
const init = async () => {
  const [, , dbUser, dbPass] = process.argv;
  console.log(dbUser, dbPass);
  // mongoose.set('useFindAndModify', false);
  await mongoose.connect('mongodb://localhost:27017/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    user: dbUser,
    pass: dbPass,
    authSource: 'amby-db',
    dbName: 'amby-db',
  });
  const serverDao = new ServerDao(mongoose);
  const dbService = new DbService(serverDao);

  const startupService = new StartupService(dbService);

  await startupService.initCollections();

  const servers = await startupService.getServers();
  const model = new AmbyModel(servers);

  const commandService = new CommandService(dbService, model);

  const something = await commandService.getServerById('default');
  console.log(something);
  const somethingElse = await commandService.getServerById('381401643268308992');
  console.log(somethingElse);

  const commandList = getCommandList(commandService);

  // start bot
  client.on('ready', () => startupService.handleReadyEvent(client, model));

  return new AmbyController(commandList, model);
};

const main = async () => {
  const controller = await init();

  // checks every message sent to the server
  client.on('message', (msg) => controller.handleMessageEvent(msg));
};

client.login(token);

main();
