const message = require("../functions/message");

module.exports = {
    go: msg => {
        message.send(msg.channel, "leave me alone.");
    },
    usage: prefix => `${prefix}hey`,
    snippet: "You say hey to Amby and you get a response",
    help: ""
};