const hey = require("./heyCommand");
const role = require("./roleCommand");
const emoji = require("./emojiCommand");
const play = require("./playCommand");
const add = require("./addCommand");
const grind = require("./grindCommand");
const echo = require("./echoCommand");
const get = require("./getCommand");



module.exports = {
    hey: (msg, rest) => hey.snippet(msg.channel),
    role: (msg, rest) => role.snippet(msg, rest),
    emoji: (msg, rest) => emoji.snippet(msg, rest),
    play: (msg, rest) => play.snippet(msg.channel, rest),
    add: (msg, rest) => add.snippet(msg.channel, rest),
    grind: (msg, rest) => grind.snippet(msg.channel, rest),
    echo: (msg, rest) => echo.snippet(msg.channel, rest),
    get: (msg, rest) => get.snippet(msg, rest)
};