const { RichEmbed } = require('discord.js');
const { prefix } = require('../../config');
const message = require('../functions/message');

class Command {
    constructor(go, usage, snippet, helpText) {
        this.go = go;
        this.usage = usage;
        this.snippet = snippet;
        this.helpText = helpText;
    }

    help(msg) {
        let response = new RichEmbed()
            .setColor('#0099ff')
            .setTitle(prefix + this.usage)
            .addField("", this.helpText);

        message.send(msg.channel, response);
    }
}

module.exports = Command;