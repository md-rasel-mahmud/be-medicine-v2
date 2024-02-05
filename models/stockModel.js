const mongoose = require("mongoose");

const stockSchema = mongoose.Schema({
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
});

module.exports = mongoose.model("Stock", stockSchema);
