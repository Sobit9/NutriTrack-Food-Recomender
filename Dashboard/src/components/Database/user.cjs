const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  uname: { type: String, required: true },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
