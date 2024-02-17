const asyncHandler = require("express-async-handler");
const Stock = require("../models/stockModel");

// @GET STOCKS
exports.getStocks = asyncHandler(async (req, res) => {
  const { page, limit } = req.query;

  // -> WITHOUT PAGINATION
  if (!page || !limit) {
    const result = await Stock.find()
      .select({ __v: 0 })
      .sort({ stockAddedAt: -1 });
    // .populate("medicines.medicine");

    return res.status(200).json({ result });
  }

  // -> PAGINATION
  const result = await Stock.find()
    .select({ __v: 0 })
    .sort({ stockAddedAt: -1 })
    .populate("medicines.medicine")
    .limit(limit * 1)
    .skip((page - 1) * limit);

  res.status(200).json({
    result,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil((await Stock.countDocuments()) / limit),
      totalData: await Stock.countDocuments(),
    },
  });
});

// @GET SINGLE STOCK BY ID
exports.getSingleStock = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await Stock.findById(id)
    .select({ __v: 0 })
    .populate("medicines.medicine");

  res.status(200).json({ result: result || {} });
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
  const saveStock = await Stock.create(req.body);

  const result = await Stock.findById(saveStock._id)
    .populate("medicines.medicine", "-__v")
    .select({ __v: 0 });
  res.status(201).json({ result });
});
