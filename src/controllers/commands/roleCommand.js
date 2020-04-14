const message = require('../../utils/message');
const validate = require('../../utils/validation');
const Command = require('../../definitions/Command');

const changeColor = (msg, rest, roleName) => {
    const color = rest[1];
    if (validate.isValidHexColor(color)) {
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
        if (roleName === roles[i].name) {
            roles[i].setColor(color);
            return true;
        }
    }
    return false;
};

const go = (msg, rest) => {
    if (rest.includes("color")) {
        const roleName = rest.splice(0, rest.indexOf("color")).join(" ").toLowerCase();
        changeColor(msg, rest, roleName);
    }

    else if (rest.includes("name")) {
        const roleName = rest.splice(0, rest.indexOf("name")).join(" ");
        const newName = rest.slice(1, rest.length).join(" ");
        msg.member.colorRole.setName(newName);
        message.send(msg.channel, `Your role name has been set to ${newName}`);
    }
};

const usage = "role <name(optional)> <color|name> <hex value|new name>";
const snippet = "Changes the color or name of one of your roles. But not Savion.";
const helpText = "";

module.exports = new Command("role", go, usage, snippet, helpText);