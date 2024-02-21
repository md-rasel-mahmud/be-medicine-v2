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
});

// create index for search feature
dashboardSchema.index({});

module.exports = mongoose.model("Dashboard", dashboardSchema);
