const asyncHandler = require("express-async-handler");
const Stock = require("../models/stockModel");

// @GET STOCKS
exports.getStocks = asyncHandler(async (req, res) => {
  const { page, limit } = req.query;

  if (!page || !limit) {
    const result = await Stock.find()
      .select({ __v: 0 })
      .sort({ stockAddedAt: -1 })
      .populate("medicines.medicine", "name groupName -_id");

    return res.status(200).json({ result });
  }
  const result = await Stock.find()
    .select({ __v: 0 })
    .sort({ stockAddedAt: -1 })
    .populate("medicines.medicine", "name groupName -_id")
    .limit(limit * 1)
    .skip((page - 1) * limit);

  res.status(200).json({ result });
});

// @UPDATE STOCK
exports.updateStock = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { quantity, price } = req.body;
  const result = await Stock.findByIdAndUpdate(
    id,
    { quantity, price },
    { new: true }
  );

  res.status(200).json({ result });
});

// @DELETE STOCK
exports.deleteStock = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await Stock.findByIdAndDelete(id);
  res.status(200).json({ result });
});

// @CREATE STOCK
exports.createStock = asyncHandler(async (req, res) => {
  const { medicines, quantity, stockAddAt } = req.body;
  const result = await Stock.create({ medicines, quantity, stockAddAt });
  res.status(201).json({ result });
});
