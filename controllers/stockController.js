const asyncHandler = require("express-async-handler");
const Stock = require("../models/stockModel");

// @GET STOCKS
exports.getStocks = asyncHandler(async (req, res) => {
  const { page, limit } = req.query;
  const intPage = parseInt(page);
  const intLimit = parseInt(limit);

  let result, currentPage, totalPages, totalData, limitValue;
  if (!page || !limit) {
    result = await Stock.find()
      .select({ __v: 0 })
      .sort({ stockAddedAt: -1 })
      .populate("medicines.medicine");
    currentPage = 1;
    totalData = result.length;
    limitValue = totalData;
    totalPages = 1;
  } else {
    result = await Stock.find()
      .select({ __v: 0 })
      .sort({ stockAddedAt: -1 })
      .populate("medicines.medicine")
      .limit(intLimit * 1)
      .skip((intPage - 1) * intLimit);
    currentPage = intPage;
    totalData = await Stock.countDocuments();
    limitValue = intLimit;
    totalPages = Math.ceil(totalData / intLimit);
  }
  res.status(200).json({
    result,
    pagination: {
      currentPage,
      totalPages,
      totalData,
      limit: limitValue,
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
    { new: true },
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
