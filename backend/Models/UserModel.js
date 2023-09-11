// models/UserModel.js
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Your username is required"],
  },
  firstName: {
    type: String,
    required: [true, "Your First Name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Your Last Name is required"],
  },
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  birthday: {
    type: Date,
    required: [true, "Your birthday is required"],
  },
  height: Number,  
  weight: Number,  
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

module.exports = mongoose.model('User', userSchema);
