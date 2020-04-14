const createServerDAO = mongoose => {
    const serverSchema = require('./server.schema')(mongoose);
    const serverModel = mongoose.model('ServerModel', serverSchema);

    const findAllServerPrefixes = () => {
        return serverModel.find({ }, '_id prefix');
    };

    const findServerById = serverId => {
        return serverModel.findById(serverId);
    };

    const saveServer = server => {
        return serverModel.create(server);
    };

    const updateServer = (serverId, server) => {
        return serverModel.updateOne({ _id: serverId }, { $set: server });
    };

    const updateAmbyColor = (serverId, color) => {
        return serverModel.updateOne({ _id: serverId }, { $set: { ambyColor: color } });
    };

    const updatePrefix = (serverId, prefix) => {
        return serverModel.updateOne({ _id: serverId }, { $set: { prefix: prefix } });
    };

    const removeServer = serverId => {
        return serverModel.deleteOne({ _id: serverId });
    };

    return {
        findAllServerPrefixes,
        findServerById,
        saveServer,
        updateServer,
        updateAmbyColor,
        updatePrefix,
        removeServer
    }
};

module.exports = createServerDAO;