const { Schema, model } = require("mongoose");

const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
  name: { type: String },
  email: { type: String, required: true, unique: false },
  password: { type: String, required: false },
  date: { type: Date, default: Date.now },
});

module.exports = model("User", UserSchema);
