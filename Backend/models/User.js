const mongoose = require("mongoose");

const avatarSchema = new mongoose.Schema({
  id: Number,
  name: String,
  img: String,
  phrase: String
}, { _id: false }); // _id: false prevents nested _id creation

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: avatarSchema, // store avatar object
  resetPasswordOTP: String,
  resetPasswordExpires: Date,
});

module.exports = mongoose.model("User", UserSchema);
