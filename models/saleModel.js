const mongoose = require("mongoose");
const saleModel = mongoose.Schema(
  {
    invoiceNo: {
      type: String,
      required: [true, "Please add a invoice number"],
    },
    totalAmount: {
      type: Number,
      required: [true, "Please add a total amount"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    medicine: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Medicine",
        required: true,
      },
    ],
    quantity: {
      type: Number,
      required: [true, "Please add a quantity"],
    },
  },

  { timestamps: true }
);
module.exports = mongoose.model("Sale", saleModel);
