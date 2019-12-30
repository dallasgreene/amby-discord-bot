const message = require("../functions/message");

module.exports = {
    go: (msg, rest) => {
        if (rest.length === 1) {
            const name = rest[0];
            msg.guild.createEmoji(msg.attachments.first().url, name);
        }
    },
    usage: prefix => `${prefix}emoji <emoji name> [image attachment]`,
    snippet: "An emoji of the attached image is created with the given name",
    help: ""
};