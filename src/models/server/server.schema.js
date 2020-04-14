const { isValidHexColor } = require('../../utils/validation');

const createServerSchema = mongoose => {
    return mongoose.Schema({
        _id: String,
        prefix: String,
        ambyColor: { type: String, validate: isValidHexColor }
    }, { collection: 'Servers' });
};

module.exports = createServerSchema;