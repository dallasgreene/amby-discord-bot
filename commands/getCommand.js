const message = require("../functions/message");

module.exports = {
    go: (guild, rest) => {
        if (rest[0] === "roleSnow") {
            const keys = guild.roles.keyArray();
            keys.forEach(key => {
                console.log(`${key} : ${guild.roles.get(key)}`);
            });
        }
    }
};