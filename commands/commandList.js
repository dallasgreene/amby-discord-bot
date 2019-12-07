const hey = require("./heyCommand");
const role = require("./roleCommand");
const emoji = require("./emojiCommand");
const play = require("./playCommand");
const add = require("./addCommand");
const grind = require("./grindCommand");
const stop = require("./stopCommand");

module.exports = {
    hey: (msg, rest) => hey.go(msg.channel),
    role: (msg, rest) => role.go(msg, rest),
    emoji: (msg, rest) => emoji.go(msg, rest),
    play: (msg, rest) => play.go(msg.channel, rest),
    add: (msg, rest) => add.go(msg.channel, rest),
    grind: (msg, rest) => grind.go(msg.channel, rest),
    stop: (msg, rest) => stop.go(msg.channel, rest)
};