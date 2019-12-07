const message = require("../functions/message");

module.exports = {
    go: (msg, rest) => {
        if (rest[0] === "roleSnow") {
            const roles = msg.channel.guild.roles;
            const keys = roles.keyArray();
            keys.forEach(key => {
                message.send(msg.channel, `${roles.get(key)}`);
                console.log(`${key} : ${roles.get(key)}`);
            });
        }
        else if (rest[0] === "myRoles") {

        }
    }
};