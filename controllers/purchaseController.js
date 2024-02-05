const Purchase = require("../models/purchaseModel");
const asyncHandler = require("express-async-handler");
const Medicine = require("../models/medicineModel");
const User = require("../models/userModel");
const Supplier = require("../models/supplierModel");
const Stock = require("../models/stockModel");

// @GET ALL PURCHASE
exports.getAllPurchase = asyncHandler(async (req, res) => {
  const result = await Purchase.find().select({ __v: 0 });
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
    user,
    shippingCost,
    globalDiscount,
  } = req.body;

  // SAVE THE MEDICINE TO THE STOCK
  const { _id: insertedStockId } = await Stock.save(purchaseStocks);

  const newPurchase = new Purchase({
    purchaseDate,
    purchaseNo,
    totalAmount,
    description,
    stock: insertedStockId,
    supplier,
    user,
    shippingCost,
    globalDiscount,
  });

  const result = await newPurchase.save();

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
  );

  res.status(200).json({ result, message: "Purchase updated successfully" });

  res.send("Update Purchase");
});

// @DELETE PURCHASE
exports.deletePurchase = asyncHandler(async (req, res) => {
  res.send("Delete Purchase");
});
