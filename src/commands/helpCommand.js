const { RichEmbed } = require('discord.js');
const { prefix } = require('../../config');
const message = require('../functions/message');
const Command = require('../models/Command');
const commands = require('./commandsCommand');

module.exports = commandList => {
    const usage = "help <command>";
    const snippet = "get details on how to use a command";
    const helpText = `Specify a command and Amby will tell you how to use it. `
        + `If you just use ${prefix}help, Amby will give you a list of available commands.`;

    const go = (msg, rest) => {
        const cmd = rest[0];
        if (rest.length > 0 && commandList.hasOwnProperty(cmd)) {
            commandList[cmd].help(msg);
        } else {
            commandList.commands.go(msg);
        }
    };

    return new Command(go, usage, snippet, helpText);
};