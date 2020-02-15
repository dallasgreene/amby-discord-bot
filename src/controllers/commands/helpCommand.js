const { RichEmbed } = require('discord.js');
const { prefix } = require('../../../configuration/config');
const message = require('../../util/message');
const Command = require('../../definitions/Command');
const commands = require('./commandsCommand');

module.exports = commandList => {
    const usage = "help <command(optional)>";
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

    return new Command("help", go, usage, snippet, helpText);
};