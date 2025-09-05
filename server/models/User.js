const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
    },
    googleId: {
      type: String,
    },
    picture: {
      type: String,
    },
    phone: {
      type: String,
      unique: true,
      sparse: true,
    },
    gender: { 
      type: String, 
      required: false
    },
    age: { 
      type: Number, 
      required: false 
    },
  },
  { timestamps: true }
);

// ✅ FIX: The pre('save') hook is removed as password hashing is now handled
// directly in the authController.js signup function.

userSchema.methods.matchPassword = async function (enteredPassword) {
  if (!this.password) {
    return false;
  }
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
