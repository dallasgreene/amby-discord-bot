const message = require("../functions/message");

module.exports = {
    go: msg => {
        message.send(msg.channel, "leave me alone.");
    }
};