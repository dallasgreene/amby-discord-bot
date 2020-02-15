const message = require("../../util/message");
const Command = require('../../definitions/Command');

const go = msg => {
    const channel = msg.channel;
    return setInterval(() => message.send(channel, "!beg"), 10500);
};

const usage = "grind";
const snippet = "This was supposed to get us unlimited gambling funds, but NighLemur is a stupid bitch";
const helpText = "";

module.exports = new Command("grind", go, usage, snippet, helpText);