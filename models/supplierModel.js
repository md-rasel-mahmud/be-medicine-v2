const mongoose = require("mongoose");

const supplierSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add the Supplier Name"],
    trim: true,
  },
  phone: {
    type: String,
    required: [true, "Please add the Supplier Phone"],
  },
  email: {
    type: String,
    unique: true,
  },
  address: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
});
module.exports = mongoose.model("Supplier", supplierSchema);
