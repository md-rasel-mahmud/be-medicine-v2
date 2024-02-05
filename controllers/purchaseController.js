const Purchase = require("../models/purchaseModel");
const asyncHandler = require("express-async-handler");
const Stock = require("../models/stockModel");

// @GET ALL PURCHASE
exports.getAllPurchase = asyncHandler(async (req, res) => {
  const { page, limit } = req.query;

  if (page && limit) {
    const result = await Purchase.find()
      .populate({
        path: "stock",
        populate: {
          path: "medicines.medicine",
          model: "Medicine",
          select: "-__v",
        },
        select: "-__v",
      })
      .populate("supplier", "-__v")
      .populate("user", "-__v -password")
      .select({ __v: 0 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    return res.status(200).json({ result });
  }

  // POPULATE THE STOCK, MEDICINE, USER
  const result = await Purchase.find()
    .populate({
      path: "stock",
      populate: {
        path: "medicines.medicine",
        model: "Medicine",
        select: "-__v",
      },
      select: "-__v",
    })
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
    purchaseStocks,
    supplier,
    shippingCost,
    globalDiscount,
  } = req.body;

  // SAVE THE MEDICINE TO THE STOCK
  const newStock = new Stock(purchaseStocks);
  const insertedStock = await newStock.save();
  const insertedStockId = insertedStock._id;

  // PREPARE THE PURCHASE DATA
  const newPurchase = new Purchase({
    purchaseDate,
    purchaseNo,
    totalAmount,
    description,
    stock: insertedStockId,
    supplier,
    user: req.user._id,
    shippingCost,
    globalDiscount,
  });

  // SAVE THE PURCHASE AND POPULATE THE STOCK, MEDICINES.MEDICINE, SUPPLIER, USER
  const insertPurchaseData = await newPurchase.save();
  const result = await Purchase.findById(insertPurchaseData._id)
    .populate({
      path: "stock",
      populate: {
        path: "medicines.medicine",
        model: "Medicine",
        select: "-__v",
      },
      select: "-__v",
    })
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
    .populate({
      path: "stock",
      populate: {
        path: "medicines.medicine",
        model: "Medicine",
        select: "-__v",
      },
      select: "-__v",
    })
    .populate("supplier", "-__v")
    .populate("user", "-__v -password");

  res.status(200).json({ result, message: "Purchase updated successfully" });
});

// @DELETE PURCHASE
exports.deletePurchase = asyncHandler(async (req, res) => {
  res.send("Delete Purchase");
});
