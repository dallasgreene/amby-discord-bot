const message = require("../functions/message");

module.exports = {
    go: (channel, rest) => {
        message.send(channel, rest.join(" "));
    }
};