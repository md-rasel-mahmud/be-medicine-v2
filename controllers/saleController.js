const asyncHandler = require("express-async-handler");
const Sale = require("../models/saleModel");
const Stock = require("../models/stockModel");

// @GET ALL SALES

exports.getSales = asyncHandler(async (req, res) => {
  const { page, limit, createdAt } = req.query;

  // Define match condition based on query parameters
  const match = {};
  if (createdAt) {
    const startOfDay = new Date(createdAt);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(createdAt);
    endOfDay.setHours(23, 59, 59, 999);
    match.createdAt = { $gte: startOfDay, $lte: endOfDay };
  }

  // Aggregation pipeline stages
  const pipeline = [];

  // Match stage
  pipeline.push({ $match: match });

  // Optionally project fields
  pipeline.push({ $project: { __v: 0 } });

  // Pagination stage
  if (page && limit) {
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;
    pipeline.push({ $skip: (pageNum - 1) * limitNum });
    pipeline.push({ $limit: limitNum });
  }

  // Execute aggregation pipeline
  const result = await Sale.aggregate(pipeline);

  // If createdAt is provided, fetch stock information
  if (createdAt) {
    for (const sale of result) {
      for (const medicine of sale.medicines) {
        const stockData = await Stock.findOne({
          "medicines.medicine": medicine.medicine,
        });
        if (stockData) {
          const stockMedicine = stockData.medicines.find(
            (item) => item.medicine.toString() === medicine.medicine.toString()
          );
          medicine.stockQuantity = stockMedicine ? stockMedicine.quantity : 0;
        }
      }
    }
  }

  res.json({ result });
});

// @GET SINGLE SALE
exports.getSingleSale = asyncHandler(async (req, res) => {
  const result = await Sale.findById(req.params.id).select("-__v");
  if (result) {
    res.json({ result });
  } else {
    res.status(404);
    throw new Error("Sale not found");
  }
});

// @CREATE SALE
exports.createSale = asyncHandler(async (req, res) => {
  const { invoiceNo, totalAmount, description, medicines } = req.body;

  // Prepare bulk operations array for update and delete
  const bulkOperations = [];

  // Iterate over each sale item and prepare update and delete operations
  for (const saleItem of medicines) {
    bulkOperations.push({
      updateOne: {
        filter: {
          "medicines.medicine": saleItem.medicine,
          stockAddedAt: saleItem.stockAddedAt,
          "medicines.quantity": { $gte: saleItem.saleQuantity }, // Ensure enough quantity is available
        },
        update: {
          $inc: {
            "medicines.$.quantity": -saleItem.saleQuantity,
          },
        },
      },
    });

    bulkOperations.push({
      updateOne: {
        filter: {
          "medicines.medicine": saleItem.medicine,
          stockAddedAt: saleItem.stockAddedAt,
          "medicines.quantity": 0, // Remove items with zero quantity
        },
        update: {
          $pull: {
            medicines: { quantity: 0 },
          },
        },
      },
    });
  }

  // Perform bulk write operation
  await Stock.bulkWrite(bulkOperations);

  // Remove stock with empty medicines array
  await Stock.deleteMany({ medicines: { $size: 0 } });

  // Query the updated stock data
  const updatedStockData = await Stock.find({
    $or: bulkOperations.map((op) => op.updateOne.filter),
  });

  // Create sale document
  const saleData = new Sale({
    invoiceNo,
    totalAmount,
    description,
    medicines,
    user: req.user._id,
  });

  // Save sale document
  const insertedSale = await saleData.save();

  // Populate and return sale result
  const result = await Sale.findById(insertedSale._id)
    .populate("medicines.medicine", "-__v")
    .select("-__v");

  res.status(201).json({
    result,
    updatedStockData, // Include updated stock data in the response
    message: "Medicine Sale Successfully",
  });
});

// @UPDATE SALE
exports.updateSale = asyncHandler(async (req, res) => {
  const { customerName, description } = req.body;

  const result = await Sale.findByIdAndUpdate(
    { _id: id },
    { customerName, description },
    { new: true }
  );

  res.json({ result, message: "Sale updated Successfully" });
});

// @DELETE SALE
exports.deleteSale = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // -> CHECK IS THE DATA IS EXIST ONE DATABASE IF NOT FOUND THEN RESPONSE THE NOT FOUND ERROR
  const isNotExist = await Sale.findById({ _id: id });
  if (!isNotExist) {
    res.status(404);
    throw new Error("Sale Data for Delete not found!");
  }

  // -> SEND THE SUCCESSFULLY DELETE RESPONSE
  const result = await Sale.deleteOne({ _id: id });
  res.status(200).send({ result, message: "Sale Data Deleted Successfully" });
});
