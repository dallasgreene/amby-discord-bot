import Discord from 'discord.js-12';
import fs from 'fs';
import mongoose from 'mongoose';
import StartupService from './utils/StartupService';
import AmbyModel from './models/base/AmbyModel';
import AmbyController from './controllers/AmbyController';
import getCommandList from './controllers/commands/getCommandList';

const token = fs.readFileSync('./configuration/token_config_alpha').toString('utf8').trim();
const client = new Discord.Client();

/**
 * Initialize the bot via dependency injection
 * @return {Promise<AmbyController>}
 */
const init = async () => {
  const [, , dbUser, dbPass] = process.argv;
  // mongoose.set('useFindAndModify', false);
  await mongoose.connect('mongodb://localhost:27017/', {
    auth: {
      username: dbUser,
      password: dbPass,
    },
    authSource: 'admin',
    dbName: 'amby-db',
  });

  const model = new AmbyModel();
  const startupService = new StartupService(model);
  const awsClient = await startupService.getAwsClient();

  const commandList = getCommandList(model, awsClient);

  // start bot
  client.on('ready', () => (
    startupService.handleReadyEvent(client).then(() => (
      console.log(`Ya boi ${client.user.tag} is ready to go.`)
    ))
  ));

  return new AmbyController(commandList, model);
};

const main = async () => {
  const controller = await init();

  // checks every message sent to the server
  client.on('message', (msg) => controller.handleMessageEvent(msg));
};

client.login(token);

main();
