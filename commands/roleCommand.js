const message = require("../functions/message");

module.exports = {
    go: (msg, rest) => {
        if (rest.length === 2 && rest[0] === "color") {
            const color = rest[1];
            if (color.includes("#") && color.length === 7) {
                msg.member.colorRole.setColor(color);
                message.send(msg.channel, "Your new role color has been set");
            }
        }

        else if (rest[0] === "name") {
            const newName = rest.slice(1, rest.length).join(" ");
            msg.member.colorRole.setName(newName);
            message.send(msg.channel, `Your role name has been set to ${newName}`);
        }
    }
};