const { Schema, model } = require("mongoose");

const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

UserSchema.methods.encryptPassword = async (password) => {
  return await password;
};

UserSchema.methods.matchPassword = async function (password) {
  return await compare(password, password);
};

module.exports = model("User", UserSchema);
