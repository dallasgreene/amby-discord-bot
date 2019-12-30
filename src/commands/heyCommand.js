const message = require("../functions/message");
const Command = require('../models/Command');

const go = msg => {
    message.send(msg.channel, "leave me alone.");
};

const usage = "hey";
const snippet = "You say hey to Amby and you get a response";
const helpText = "";

module.exports = new Command(go, usage, snippet, helpText);