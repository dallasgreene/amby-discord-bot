const message = require("../functions/message");

module.exports = {
    go: (channel, rest) => {
        const game = rest.join(" ");
        if (game.toLowerCase().includes("civ") || game.toLowerCase().includes("fallout")) {
            message.send(channel, "shut up oliver. " + game + " is a cool game but like, leave me alone.");
        }
        else {
            message.send(channel, "shut up oliver. " + game + " is stupid.");
        }
    }
};