const createServerSchema = (mongoose) => (
  mongoose.Schema({
    _id: String,
    prefix: String,
    ambyColorRoleId: String,
    ambyHighestRoleId: String,
    ambyRoleIds: [String],
  }, { collection: 'Server' })
);

export default createServerSchema;
