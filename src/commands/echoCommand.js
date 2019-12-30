const message = require("../functions/message");

module.exports = {
    go: (msg, rest) => {
        if (rest.includes("@everyone")) message.send(msg.channel, "stop it.");
        message.send(msg.channel, rest.join(" "));
    },
    usage: prefix => `${prefix}echo <message>`,
    snippet: "Amby repeats your message back to you, unless you're trying to @everyone, in which case cut that shit out",
    help: ""
};