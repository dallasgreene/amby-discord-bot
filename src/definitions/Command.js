const { RichEmbed } = require('discord.js');
const { prefix } = require('../../configuration/config');
const message = require('../utils/message');

class Command {
    constructor(name, go, usage, snippet, helpText) {
        this._name = name;
        this._go = go;
        this._usage = usage;
        this._snippet = snippet;
        this._helpText = helpText;
    }

    help(msg) {
        let response = new RichEmbed()
            .setColor('#0099ff')
            .setTitle(prefix + this._usage);
        if (this._helpText) response.addField("details:", this._helpText);
        else response.addField("details:", this._snippet);

        message.send(msg.channel, response);
    }

    get name() {
        return this._name;
    }

    get go() {
        return this._go;
    }

    get usage() {
        return this._usage;
    }

    get snippet() {
        return this._snippet;
    }

    get helpText() {
        return this._helpText;
    }
}

module.exports = Command;