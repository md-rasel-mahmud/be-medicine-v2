const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add the User Name"],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
    },
    phone: {
      type: String,
      unique: true,
      required: [true, "Please add the User Phone Number"],
    },
    address: {
      type: String,
      required: [true, "Please add the User Address"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please add the User Password"],
    },
    role: {
      type: String,
      enum: ["STAFF", "ADMIN"],
      default: "STAFF",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
