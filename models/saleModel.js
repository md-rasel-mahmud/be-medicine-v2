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
    customerName: {
      type: String,
      required: [true, "Please add a customer name"],
      default: "Unknown Customer",
    },
    medicines: [
      {
        medicine: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Medicine",
        },
        saleQuantity: {
          type: Number,
          required: [true, "Please add a quantity"],
        },
        stockAddedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sale", saleModel);
