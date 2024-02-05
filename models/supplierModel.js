const mongoose = require("mongoose");

const supplierSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add the Supplier Name"],
  },
  phone: {
    type: String,
    required: [true, "Please add the Supplier Phone"],
  },
  email: {
    type: String,
  },
  address: {
    type: String,
  },
  description: {
    type: String,
  },
});
module.exports = mongoose.model("Supplier", supplierSchema);
