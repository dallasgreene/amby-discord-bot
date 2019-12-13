const message = require("../functions/message");

module.exports = {
    go: (msg, rest) => {
        if (rest[0] === "roleSnow") {
            const roles = msg.channel.guild.roles;
            const keys = roles.keyArray();
        }
        else if (rest[0] === "myRoles") {

        }
    },
    usage: prefix => `${prefix}get <info tag>`,
    snippet: "This is mostly for dallas to get the snowflakes he needs",
    help: ""
};