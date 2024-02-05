const mongoose = require("mongoose");

const unitSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add the Unit Name"],
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model("Unit", unitSchema);
