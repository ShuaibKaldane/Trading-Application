const { Schema } = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  // password, salt, etc. will be added by passport-local-mongoose
});

UserSchema.plugin(passportLocalMongoose);

module.exports = { UserSchema };
