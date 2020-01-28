const { RichEmbed } = require('discord.js');
const { prefix } = require('../../configuration/config');
const message = require('../functions/message');

class Command {
    constructor(name, go, usage, snippet, helpText) {
        this.name = name;
        this.go = go;
        this.usage = usage;
        this.snippet = snippet;
        this.helpText = helpText;
    }

    help(msg) {
        let response = new RichEmbed()
            .setColor('#0099ff')
            .setTitle(prefix + this.usage);
        if (this.helpText) response.addField("details:", this.helpText);
        else response.addField("details:", this.snippet);

        message.send(msg.channel, response);
    }
}

module.exports = Command;