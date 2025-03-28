const { Schema, model } = require("mongoose");

const User = Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
});

module.exports = model("User", User);