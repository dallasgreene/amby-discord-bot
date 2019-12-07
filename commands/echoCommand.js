const message = require("../functions/message");

module.exports = {
    go: (channel, rest) => {
        if (rest.includes("@everyone")) message.send(channel, "stop it.");
        message.send(channel, rest.join(" "));
    }
};