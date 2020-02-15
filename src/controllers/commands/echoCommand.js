const message = require('../../util/message');
const Command = require('../../definitions/Command');


const go = (msg, rest) => {
    if (rest.includes("@everyone")) message.send(msg.channel, "stop it.");
    else message.send(msg.channel, rest.join(" "));
};
const usage = "echo <message>";
const snippet = "Amby repeats your message back to you, unless you're trying to @everyone, in which case cut that shit out";
const helpText = "";


module.exports = new Command("echo", go, usage, snippet, helpText);