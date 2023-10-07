const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    // unique: true,
  },
  role: {
    type: String,
    default: false,
  },
  password: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Users", UserSchema);
