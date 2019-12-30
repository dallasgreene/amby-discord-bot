const hey = require("./heyCommand");
const role = require("./roleCommand");
const emoji = require("./emojiCommand");
const play = require("./playCommand");
const add = require("./addCommand");
const grind = require("./grindCommand");
const echo = require("./echoCommand");
// const get = require("./getCommand");

let commandList = {
    hey,
    role,
    emoji,
    play,
    add,
    grind,
    echo
};

const commands = require('./commandsCommand')(commandList);
commandList.commands = commands;

const help = require('./helpCommand')(commandList);
commandList.help = help;

module.exports = commandList;