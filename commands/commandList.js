const hey = require("./heyCommand");
const role = require("./roleCommand");
const emoji = require("./emojiCommand");
const play = require("./playCommand");
const add = require("./addCommand");
const grind = require("./grindCommand");
const echo = require("./echoCommand");
// const get = require("./getCommand");

const commandList = {
    hey,
    role,
    emoji,
    play,
    add,
    grind,
    echo
};

const help = require('./helpCommand')(commandList);

module.exports = {
    ...commandList,
    help
};