const message = require('../utils/message');

const genericResponses = [
  'No.',
  'You goddang zoomers and your fortnite and your asking me to do things',
  'I don\'t feel like it.',
  'I don\'t WANT to',
  'grrrrr',
  'bro fr i aint doin that',
  'thats so unchill of you',
];

class AmbyController {
  /**
   * @constructor
   * @param {Map<String, Command>} commandList
   * @param {AmbyModel} model
   */
  constructor(commandList, model) {
    this.commandList = commandList;
    this.model = model;
    this.lastCommand = 'none';
  }

  /**
   * Handles a message event from any of the servers/guilds that Amby is a member of.
   * @param {Message} msg
   * @returns {Promise<void>}
   */
  async handleMessageEvent(msg) {
    // if the message is from a bot, ignore it
    if (msg.author.bot) return;

    const { guild } = msg;
    if (!guild.available) {
      message.send(msg.channel, 'Guild was unavailable, Dallas check this out this is weird.');
      return;
    }
    const server = await this.model.server.findById(guild.id);
    console.log('got server', server);
    const prefix = server.getPrefix();

    // if msg author is one of the boys, theres a 0.5% chance they get memed on
    const isHomie = await this.model.homie.exists(msg.member.id);
    if (isHomie && Math.random() < 0.005) {
      const homie = await this.model.homie.findById(msg.member.id);
      const snarkyResponses = homie.getSnarkyResponses();
      message.send(msg.channel,
        snarkyResponses[Math.floor(Math.random() * snarkyResponses.length)]);
      return;
    }

    // ignore any message that does not start with prefix in the configuration file.
    if (msg.content.substring(0, prefix.length) !== prefix) return;

    // array of everything after the prefix defined in the config
    const rest = msg.content.substring(prefix.length).trim().split(' ');

    // the command that was received by the bot
    const command = rest.shift().toLowerCase();

    // debugging:
    console.log(`Set rest: "${rest}", length: ${rest.length}`);
    console.log(`Set command: "${command}"`);

    // theres a chance that Amby just doesn't do what you tell them to
    if (command === this.lastCommand) {
      message.send(msg.channel, 'alright whatever');
    } else if (Math.random() < 0.05) {
      const response = genericResponses[Math.floor(Math.random() * genericResponses.length)];
      message.send(msg.channel, response);
      this.lastCommand = command;
      return;
    }

    this.lastCommand = 'none'; // reset last command

    // check if command is recognized, and if so, call it
    if (Object.prototype.hasOwnProperty.call(this.commandList, command)) {
      try {
        const commandResponse = await this.commandList[command].go(msg, rest);
        message.send(msg.channel, commandResponse);
      } catch (err) {
        console.log(err);
        message.send(msg.channel, 'There\'s been an error. Fix ur bot :b:allas');
      }
    } else {
      const response = `${message.spongeIt(msg.content.substring(prefix.length))} thats not even a thing dumb dumb`;
      message.send(msg.channel, response);
    }
  }
}

module.exports = AmbyController;
