const message = require('../../util/message');
const Command = require('../../definitions/Command');


const go = (msg, rest) => {
    if (rest.length === 1) {
        const name = rest[0];
        msg.guild.createEmoji(msg.attachments.first().url, name);
    }
};
const usage = "emoji <emoji name> [image attachment]";
const snippet = "An emoji of the attached image is created with the given name";
const helpText = "";


module.exports = new Command("emoji", go, usage, snippet, helpText);