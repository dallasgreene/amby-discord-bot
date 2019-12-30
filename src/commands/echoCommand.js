const message = require('../functions/message');
const Command = require('../models/Command');


const go = (msg, rest) => {
    if (rest.includes("@everyone")) message.send(msg.channel, "stop it.");
    message.send(msg.channel, rest.join(" "));
};
const usage = "echo <message>";
const snippet = "Amby repeats your message back to you, unless you're trying to @everyone, in which case cut that shit out";
const helpText = "";


module.exports = new Command(go, usage, snippet, helpText);