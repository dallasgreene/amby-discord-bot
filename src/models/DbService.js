class DbService {
    static _instance = null;

    constructor() {
        const mongoose = require('mongoose');
        this._initMongoose();
        this._servers = require('./server/server.dao')(mongoose);
    }

    static getInstance() {
        if (this._instance === null) {
            this._instance = new DbService();
        }
        return this._instance;
    };

    _initMongoose(mongoose) {
        mongoose.set('autoIndex', false);
        mongoose.set('autoCreate', true);
    }


    get servers() {
        return this._servers;
    }
}