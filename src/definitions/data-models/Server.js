/**
 * Represents a Discord Server (aka Guild)
 */
class Server {
    /**
     * @constructor
     * @param {String} snowflake
     * @param {String} prefix
     * @param {String} ambyColorRoleId
     * @param {String} ambyHighestRoleId
     * @param {String[]} ambyRoleIds
     */
    constructor(snowflake, prefix, ambyColorRoleId, ambyHighestRoleId, ambyRoleIds) {
        this._snowflake = snowflake;
        this._prefix = prefix;
        this._ambyColorRoleId = ambyColorRoleId;
        this._ambyHighestRoleId = ambyHighestRoleId;
        this._ambyRoleIds = ambyRoleIds;
    }

    get id() {
        return this.snowflake;
    }

    get snowflake() {
        return this._snowflake;
    }

    get prefix() {
        return this._prefix;
    }

    get ambyColorRoleId() {
        return this._ambyColorRoleId;
    }

    get ambyHighestRoleId() {
        return this._ambyHighestRoleId;
    }

    get ambyRoleIds() {
        return this._ambyRoleIds;
    }
}

module.exports = Server;