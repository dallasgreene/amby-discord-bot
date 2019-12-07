const message = require("../functions/message");

module.exports = {
    go: (channel, rest) => {
        return setInterval(() => message.send(channel, "!beg"), 10500);
    }
};