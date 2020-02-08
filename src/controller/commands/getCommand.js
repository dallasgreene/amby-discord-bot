const message = require('../../functions/message');
const Command = require('../../models/Command');


const go = (msg, rest) => {
    if (rest[0] === "roleSnow") {
        const roles = msg.channel.guild.roles;
        const keys = roles.keyArray();
    }
    else if (rest[0] === "myRoles") {

    }
};
const usage = "get <info tag>";
const snippet = "This is mostly for dallas to get the snowflakes he needs";
const helpText = "";


module.exports = new Command("get", go, usage, snippet, helpText);