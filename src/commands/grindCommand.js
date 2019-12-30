const message = require("../functions/message");

module.exports = {
    go: msg => {
        const channel = msg.channel;
        return setInterval(() => message.send(channel, "!beg"), 10500);
    },
    usage: prefix => `${prefix}grind`,
    snippet: "This was supposed to get us unlimited gambling funds, but NighLemur is a stupid bitch",
    help: ""
};