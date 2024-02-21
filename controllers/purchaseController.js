const Purchase = require("../models/purchaseModel");
const asyncHandler = require("express-async-handler");
const Stock = require("../models/stockModel");

// @GET ALL PURCHASE
exports.getAllPurchase = asyncHandler(async (req, res) => {
  const { page, limit } = req.query;
  const intPage = parseInt(page);
  const intLimit = parseInt(limit);

  if (page && limit) {
    const result = await Purchase.find()
      .populate("stocks.medicine", "-__v")
      .populate("supplier", "-__v")
      .populate("user", "-__v -password")
      .select({ __v: 0 })
      .limit(intLimit * 1)
      .skip((intPage - 1) * intLimit);

    return res.status(200).json({
      result,
      pagination: {
        currentPage: intPage,
        totalPages: Math.ceil((await Purchase.countDocuments()) / intLimit),
        totalData: await Medicine.countDocuments(),
      },
    });
  }

  // POPULATE THE STOCK, MEDICINE, USER
  const result = await Purchase.find()
    .populate("stocks.medicine", "-__v")
    .populate("supplier", "-__v")
    .populate("user", "-__v -password")
    .select({ __v: 0 });

  res.status(200).json({ result });
});

// @GET SINGLE PURCHASE BY ID
exports.getSinglePurchase = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const result = await Purchase.findById(id).select({ __v: 0 });

  res.status(200).json({ result: result || {} });
});

// @CREATE PURCHASE
exports.createPurchase = asyncHandler(async (req, res) => {
  const {
    purchaseDate,
    purchaseNo,
    totalAmount,
    description,
    stocks,
    supplier,
    shippingCost,
    globalDiscount,
  } = req.body;

  // SAVE THE MEDICINE TO THE STOCK
  const newStock = new Stock({
    medicines: [...stocks],
    stockAddedAt: purchaseDate,
  });
  await newStock.save();

  // PREPARE THE PURCHASE DATA
  const newPurchase = new Purchase({
    purchaseDate,
    purchaseNo,
    totalAmount,
    description,
    stocks,
    supplier,
    shippingCost,
    globalDiscount,
    user: req.user._id,
  });

  // SAVE THE PURCHASE AND POPULATE THE STOCK, MEDICINES.MEDICINE, SUPPLIER, USER
  const insertPurchaseData = await newPurchase.save();
  const result = await Purchase.findById(insertPurchaseData._id)
    .populate("stocks.medicine", "-__v ")
    .populate("supplier", "-__v")
    .populate("user", "-__v -password")
    .select({ __v: 0 });

  res.status(201).json({ result, message: "Purchased successfully" });
});

// @UPDATE PURCHASE
exports.updatePurchase = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;

  const result = await Purchase.findByIdAndUpdate(
    id,
    {
      description,
    },
    { new: true }
  )
    .populate("stocks.medicine", "-__v ")
    .populate("supplier", "-__v")
    .populate("user", "-__v -password");

  res.status(200).json({ result, message: "Purchase updated successfully" });
});

// @DELETE PURCHASE
exports.deletePurchase = asyncHandler(async (req, res) => {
  res.send("Delete Purchase");
});
