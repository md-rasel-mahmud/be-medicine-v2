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

// create a dummy data for supplier
// {
//     "name": "supplier 1",
//     "phone": "1234567890",
//     "email": "example@mail.com",
//     "address": "address 1",
//     "description": "description 1"
// }
