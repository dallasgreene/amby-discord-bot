const { RichEmbed } = require('discord.js');
const { prefix } = require('../../../configuration/config');
const message = require('../../utils/message');
const Command = require('../../definitions/Command');

module.exports = commandList => {
    const usage = "commands";
    const snippet = "get a list of all available commands";
    const helpText = snippet;

    const go = msg => {
        let helpMsg = new RichEmbed()
            .setColor('#0099ff')
            .setTitle("Available Commands:");

        for (let cmd in commandList) {
            if (commandList.hasOwnProperty(cmd)) {
                helpMsg.addField(prefix + commandList[cmd].usage, commandList[cmd].snippet);
            }
        }

        message.send(msg.channel, helpMsg);
    };

    return new Command("commands", go, usage, snippet, helpText);
};