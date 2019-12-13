const message = require("../functions/message");

module.exports = {
    go: (msg, rest) => {
        const game = rest.join(" ");
        if (game.toLowerCase().includes("civ") || game.toLowerCase().includes("fallout")) {
            message.send(msg.channel, "shut up. " + game + " is a cool game but like, leave me alone.");
        }
        else {
            message.send(msg.channel, "shut up. " + game + " is stupid.");
        }
    },
    usage: prefix => `${prefix}play <game>`,
    snippet: "Amby launches a twitch stream of the specified game",
    help: ""
};