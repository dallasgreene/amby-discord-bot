const message = require('../utils/message');
const memberSnowflakes = require('../../configuration/memberSnowflakes.json');
const responses = require('../../configuration/responses.json');

class AmbyController {
    /**
     * @constructor
     * @param {Map<String, Command>} commandList
     * @param {AmbyModel} model
     */
    constructor(commandList, model) {
        this._commandList = commandList;
        this._model = model;
        this._lastCommand = `none`;
    }

    /**
     * Handles a message event from any of the servers/guilds that Amby is a member of.
     * @param {Message} msg
     * @returns {Promise<void>}
     */
    async handleMessageEvent(msg) {
        // if the message is from a bot, ignore it
        if (msg.author.bot) return;

        const guild = msg.guild;
        if (!guild.available) {
            message.send(msg.channel, `Guild was unavailable, Dallas check this shit out this is weird.`);
            return;
        }
        const server = this._model.getServerById(guild.id);
        const prefix = (server.prefix) ? server.prefix : this._model.getServerById(`default`).prefix;

        // if msg author is one of the boys, theres a 0.5% chance they get memed on
        if (memberSnowflakes.hasOwnProperty(msg.member.id) && Math.random() < 0.005) {
            const responseArray = responses[memberSnowflakes[msg.member.id]];
            message.send(msg.channel, responseArray[Math.floor(Math.random() * responseArray.length)]);
            return;
        }

        // ignore any message that does not start with prefix in the configuration file.
        if (msg.content.substring(0, prefix.length) !== prefix) return;

        // array of everything after the prefix defined in the config
        const rest = msg.content.substring(prefix.length).trim().split(` `);

        // the command that was received by the bot, (also removes it from the array of everything after prefix)
        const command = rest.shift().toLowerCase();

        // debugging:
        console.log(`Set rest: "${rest}", length: ${rest.length}`);
        console.log(`Set command: "${command}"`);

        // theres a chance that Amby just doesn't do what you tell them to
        if (command === this._lastCommand) {
            message.send(msg.channel, `alright whatever`);
        }
        else if (Math.random() < 0.05) {
            const responsesList = responses.generic;
            const response = responsesList[Math.floor(Math.random() * responsesList.length)];
            message.send(msg.channel, response);
            this._lastCommand = command;
            return;
        }

        this._lastCommand = `none`;  // reset last command

        // check if command is recognized, and if so, call it
        if (this._commandList.hasOwnProperty(command)) {
            try {
                const commandResponse = await this._commandList[command].go(msg, rest);
                message.send(msg.channel, commandResponse);
            } catch (err) {
                console.log(err);
                message.send(msg.channel, `There's been an error. Fix ur shit :b:allas`);
            }
        } else {
            const response = `${message.spongeIt(msg.content.substring(prefix.length))} thats not even a thing dumb dumb`;
            message.send(msg.channel, response);
        }
    }
}

module.exports = AmbyController;