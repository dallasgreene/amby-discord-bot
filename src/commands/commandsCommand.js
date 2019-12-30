const { RichEmbed } = require('discord.js');
const { prefix } = require('../../config');
const message = require('../functions/message');
const Command = require('../models/Command');

module.exports = commandList => {
    const usage = "commands";
    const snippet = "get a list of all available commands";
    const helpText = snippet;

    const go = msg => {
        console.log("printing commands", commandList);
        let helpMsg = new RichEmbed()
            .setColor('#0099ff')
            .setTitle("Available Commands:");

        for (let cmd in commandList) {
            if (commandList.hasOwnProperty(cmd)) {
                console.log("command", cmd)
                helpMsg.addField(prefix + commandList[cmd].usage, commandList[cmd].snippet);
            }
        }

        console.log("iterated through command list");

        helpMsg.addField(usage, snippet);

        message.send(msg.channel, helpMsg);
    };

    return new Command(go, usage, snippet, helpText);
};