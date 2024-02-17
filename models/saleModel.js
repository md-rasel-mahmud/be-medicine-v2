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

// create a dummy demo sale for testing postman following schema
// {
//   "invoiceNo": "123",
//   "totalAmount": 123,
//   "description": "test",
//   "medicines": [
//     {
//       "medicine": "60c3f6c7b4e3a5d9d4f1e6d6",
//       "saleQuantity": 1
//     }
//   ]
// }

module.exports = mongoose.model("Sale", saleModel);
