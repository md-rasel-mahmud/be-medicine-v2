const mongoose = require("mongoose");

const medicineSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add the Medicine Name"],
    trim: true,
  },
  groupName: {
    type: String,
    required: [true, "Please add the Medicine Groupe Name"],
    trim: true,
  },
  brandName: {
    type: String,
    trim: true,
  },
  unit: {
    type: String,
    default: "piece",
  },
  selfNo: {
    type: String,
  },
  price: {
    unitPrice: {
      type: Number,
      required: [true, "Please add the Medicine Price"],
    },
    boxPrice: {
      type: Number,
    },
  },
});

// create index for search feature
medicineSchema.index({
  name: "text",
  groupName: "text",
  brandName: "text",
  selfNo: "text",
});

module.exports = mongoose.model("Medicine", medicineSchema);
