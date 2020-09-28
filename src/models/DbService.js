
class DbService {
    /**
     * @constructor
     * @param {ServerDao} serverDao
     */
    constructor(serverDao) {
        this._server = serverDao;
    }

    /**
     * @return {ServerDao}
     */
    get server() {
        return this._server;
    }
}

module.exports = DbService;