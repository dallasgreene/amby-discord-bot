const message = require("../functions/message");

module.exports = {
    go: msg => {
        const channel = msg.channel;
        return setInterval(() => message.send(channel, "!beg"), 10500);
    }
};