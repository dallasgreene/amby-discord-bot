const message = require("../../util/message");
const Command = require('../../definitions/Command');

const go = (msg, rest) => {
    message.send(msg.channel, "I can't do that, sorry.");
};

const usage = "add <person> to the <adam|fuck> list";
const snippet = "This command currently doesn't work. Someday it will";
const helpText = "";

module.exports = new Command("add", go, usage, snippet, helpText);