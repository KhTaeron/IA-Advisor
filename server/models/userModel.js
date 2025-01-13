const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 100,
  }
});

module.exports = mongoose.model("Users", UserSchema);