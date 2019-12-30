const { RichEmbed } = require('discord.js');
const { prefix } = require('../../config');
const message = require('../functions/message');
const Command = require('../models/Command');

module.exports = commandList => {
    const go = (msg, rest) => {
        let helpMsg = new RichEmbed()
            .setColor('#0099ff')
            .setTitle("Available Commands:");

        Object.keys(commandList).forEach(cmd => {
            helpMsg.addField(`${commandList[cmd].usage(prefix)}`, `${commandList[cmd].snippet}`);
        });

        message.send(msg.channel, helpMsg);
    };

    return new Command(
        go,
        "help <command>",
        "get details on how to use a command",
        `Specify a command and Amby will tell you how to use it. `
        + `If you just use ${prefix}help, Amby will give you a list of available commands.`);
};