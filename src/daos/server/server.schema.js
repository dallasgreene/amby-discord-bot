
const createServerSchema = mongoose => {
    return mongoose.Schema({
        _id: String,
        prefix: String,
        ambyColorRoleId: String,
        ambyHighestRoleId: String,
        ambyRoleIds: [String]
    }, { collection: 'Server' });
};

module.exports = createServerSchema;