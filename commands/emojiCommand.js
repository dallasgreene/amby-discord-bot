const message = require("../functions/message");

module.exports = {
    go: (msg, rest) => {
        if (rest.length === 1) {
            const name = rest[0];
            msg.guild.createEmoji(msg.attachments.first().url, name);
        }
    }
};