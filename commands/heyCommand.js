const message = require("../functions/message");

module.exports = {
    go: channel => {
        message.send(channel, "leave me alone.");
    }
};