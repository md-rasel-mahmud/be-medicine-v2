const mongoose = require("mongoose");

const dashboardSchema = mongoose.Schema({
  medicines: {
    type: object,
    totalMedicines: {
      type: Number,
    },
  },
  stock: {
    type: object,
    totalStock: {
      type: Number,
    },
  },
  sale: {
    type: object,
    totalSale: {
      type: Number,
    },
    monthlySale: {
      type: Number,
    },
  },
  purchase: {
    type: object,
    totalPurchase: {
      type: Number,
    },
    monthlyPurchase: {
      type: Number,
    },
  },
  supplier: {
    type: object,
    totalSupplier: {
      type: Number,
    },
  },
});

module.exports = mongoose.model("Dashboard", dashboardSchema);
