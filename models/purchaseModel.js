const mongoose = require("mongoose");
const purchaseModel = mongoose.Schema(
  {
    purchaseDate: {
      type: Date,
      required: [true, "Please add a purchase date"],
    },
    purchaseNo: {
      type: String,
      required: [true, "Please add a purchase number"],
    },
    totalAmount: {
      type: Number,
      required: [true, "Please add a total amount"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    purchaseStocks: [
      {
        medicines: [
          {
            medicine: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Medicine",
              required: [true, "Please add the Medicine"],
            },
            quantity: {
              type: Number,
              required: [true, "Please add the Medicine Quantity"],
            },
            expireDate: {
              type: Date,
              required: [true, "Please add the Medicine Expire Date"],
            },
          },
        ],
        stockAddedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    stock: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stock",
      required: true,
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    shippingCost: {
      type: Number,
      required: [true, "Please add a shipping cost"],
    },
    globalDiscount: {
      type: Number,
      required: [true, "Please add a global discount"],
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Purchase", purchaseModel);
