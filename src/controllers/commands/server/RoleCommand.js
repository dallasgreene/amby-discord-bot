const validate = require('../../../utils/validation');
const Command = require('../../../definitions/Command');

class RoleCommand extends Command {
    /**
     * @constructor
     * @param {CommandService} commandService
     */
    constructor(commandService) {
        super(commandService, `role`, `role <name(optional)> <color|name> <hex value|new name>`,
            `Changes the color or name of one of your roles. But not Savion.`,
            ``);
    }

    /**
     * Executes the role command given a message object and an array of arguments.
     * @param {Message} msg
     * @param {String[]} args
     * @return {Promise<String>} The message that should be displayed to the user.
     */
    async go(msg, args) {
        if (args.includes(`color`)) {
            const roleName = args.splice(0, args.indexOf(`color`)).join(` `).toLowerCase();
            return this.changeColor(msg, args[1], roleName);
        }

        else if (args.includes(`name`)) {
            const roleName = args.splice(0, args.indexOf(`name`)).join(` `).toLowerCase();
            const newName = args.slice(1, args.length).join(` `);
            await msg.member.roles.color.setName(newName);
            return `Your role name has been set to ${newName}`;
        }
    }

    /**
     * Changes the color of a role in the discord. The color is provided in args. The 
     * @param {Message} msg
     * @param {String} color
     * @param {String} [roleName]
     * @return {Promise<string>}
     */
    async changeColor(msg, color, roleName) {
        console.log(`"${color}"`, `"${roleName}"`)
        if (validate.isValidHexColor(color)) {
            if (roleName !== undefined) {
                const yourRoles = msg.member.roles.cache.array();
                if (!(await this.findAndSetColor(roleName, yourRoles, color))) {
                    const channelRoles = msg.guild.roles.cache.array();
                    if (await this.findAndSetColor(roleName, channelRoles, color)) {
                        return `role ${roleName}'s color has been set`;
                    } else {
                        return `I couldn't find role ${roleName}, maybe give me a role that exists next time`;
                    }
                } else {
                    return `role ${roleName}'s color has been set`;
                }
            } else {
                const highestRole = msg.member.roles.highest;
                if (highestRole) {
                    await highestRole.setColor(color);
                    return `role ${highestRole.name}'s color has been set`;
                } else {
                    return `you don't even have a role fucko`;
                }
            }
        } else {
            return `The color you gave was not a valid hex code.`;
        }
    }

    /**
     * Finds the role with the given role name in an array of roles and sets it to the given color.
     * @param {String} roleName
     * @param {Role[]} roles
     * @param {String} color
     * @return {Promise<boolean>}
     */
    async findAndSetColor(roleName, roles, color) {
        for (let i = 0 ; i < roles.length ; i++) {
            if (roleName === roles[i].name) {
                await roles[i].setColor(color);
                return true;
            }
        }
        return false;
    }
}

module.exports = RoleCommand;
