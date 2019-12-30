const { RichEmbed } = require('discord.js');
const { prefix } = require('../../config');
const message = require('../functions/message');

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

    return {
        go
    };
};