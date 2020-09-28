
class ServerDao {
    /**
     * @constructor
     * @param {Mongoose} mongoose
     */
    constructor(mongoose) {
        const serverSchema = require('./server.schema')(mongoose);
        this._model = mongoose.model('ServerModel', serverSchema);
    }

    /**
     * Returns true if there is a document in this collection with the given id, false otherwise.
     * @param {String} serverId
     * @return {Promise<Boolean>}
     */
    async exists(serverId) {
        return new Promise((resolve, reject) => {
            this._model.exists({ _id: serverId }, (err, wasFound) => {
                if (err !== null) reject(new Error(`Error fetching servers from database: ${err}`));
                else resolve(wasFound);
            });
        });
    }

    /**
     * Returns an array of all the server documents in the database.
     * @return {Promise<Object[]>}
     */
    async findAll() {
        return new Promise((resolve, reject) => {
            this._model.find({ }, (err, serverDocs) => {
                if (err !== null) reject(new Error(`Error fetching servers from database: ${err}`));
                else resolve(serverDocs);
            });
        });
    }

    /**
     * Returns the server document that corresponds to the given id.
     * @param {String} serverId
     * @return {Promise<Object>}
     */
    async findById(serverId) {
        return new Promise((resolve, reject) => {
            this._model.findById(serverId, (err, serverDoc) => {
                if (err !== null) {
                    reject(new Error(`Error fetching server with id "${serverId}" from database: ${err}`));
                } else {
                    resolve(serverDoc);
                }
            });
        });
    }

    /**
     * Creates the given server as a document in the database.
     * @param {Object} server
     * @return {Promise<Object>} The server document created.
     */
    async create(server) {
        return new Promise((resolve, reject) => {
            this._model.create(server, (err, serverDoc) => {
                if (err !== null) {
                    reject(new Error(`Error creating server with id "${server._id}" in database: ${err}`));
                } else {
                    resolve(serverDoc);
                }
            });
        });
    }

    /**
     * Updates the server with the given server id.
     * @param {String} serverId
     * @param {Object} server
     * @return {Promise<Object>} The server document updated.
     */
    async update(serverId, server) {
        return new Promise((resolve, reject) => {
            this._model.findByIdAndUpdate(serverId, { $set: server }, { new: true }, (err, serverDoc) => {
                if (err !== null) {
                    reject(new Error(`Error updating server with id "${serverId}" in database: ${err}`));
                } else {
                    resolve(serverDoc);
                }
            });
        });
    }

    /**
     * Deletes the server with the given server id.
     * @param {String} serverId
     * @return {Promise<void>}
     */
    async delete(serverId) {
        return new Promise((resolve, reject) => {
            this._model.deleteOne({ _id: serverId }, (err) => {
                if (err !== null) {
                    reject(new Error(`Error updating server with id "${serverId}" in database: ${err}`));
                } else {
                    resolve();
                }
            });
        });
    }
}

module.exports = ServerDao;