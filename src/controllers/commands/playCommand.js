const message = require('../../utils/message');
const Command = require('../../definitions/Command');


const go = (msg, rest) => {
    const game = rest.join(" ");
    if (game.toLowerCase().includes("civ") || game.toLowerCase().includes("fallout")) {
        message.send(msg.channel, "shut up. " + game + " is a cool game but like, leave me alone.");
    }
    else {
        message.send(msg.channel, "shut up. " + game + " is stupid.");
    }
};
const usage = "play <game>";
const snippet = "Amby launches a twitch stream of the specified game";
const helpText = "";


module.exports = new Command("play", go, usage, snippet, helpText);