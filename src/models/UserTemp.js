const { Schema, model } = require("mongoose");

const bcrypt = require("bcryptjs");

const UserTempSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

UserTempSchema.methods.encryptPassword = async (password) => {
  return await password;
};

/* UserSchema.methods.matchPassword = async function (password) {
  return await compare(password, password);
}; */

module.exports = model("UserTemp", UserTempSchema);
