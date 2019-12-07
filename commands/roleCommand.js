const message = require("../functions/message");

const changeColor = (msg, rest, roleName) => {
    console.log(`changing color for ${roleName}`);
    const color = rest[1];
    if (color.includes("#") && color.length === 7) {
        if (roleName) {
            const yourRoles = msg.member.roles.array();
            if (!findAndSetColor(roleName, yourRoles, color)) {
                const channelRoles = msg.channel.guild.roles.array();
                if (findAndSetColor(roleName, channelRoles, color)) {
                    message.send(msg.channel, `role ${roleName}'s color has been set`);
                } else {
                    message.send(msg.channel, `I couldn't find role ${roleName}, maybe give me a role that exists next time`);
                }
            } else {
                message.send(msg.channel, `role ${roleName}'s color has been set`);
            }
        } else {
            const highestRole = msg.member.highestRole;
            if (highestRole) {
                highestRole.setColor(color);
                message.send(msg.channel, `role ${highestRole.name}'s color has been set`);
            } else {
                message.send(msg.channel, "you don't even have a role fucko");
            }
        }
    }
};

const findAndSetColor = (roleName, roles, color) => {
    for (let i = 0 ; i < roles.length ; i++) {
        console.log(`comparing ${typeof roleName} to ${typeof roles[i].name}`)
        if (roleName === roles[i].name) {
            roles[i].setColor(color);
            return true;
        }
    }
    return false;
};

module.exports = {
    go: (msg, rest) => {
        let roleName = null;

        if (rest.includes("color")) {
            roleName = rest.splice(0, rest.indexOf("color")).join(" ");
            roleName = roleName.join(" ");
            changeColor(msg, rest, roleName);
        }

        else if (rest.includes("name")) {
            roleName = rest.splice(0, rest.indexOf("name"));
            const newName = rest.slice(1, rest.length).join(" ");
            msg.member.colorRole.setName(newName);
            message.send(msg.channel, `Your role name has been set to ${newName}`);
        }
    }
};