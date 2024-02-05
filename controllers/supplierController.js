const asyncHandler = require("express-async-handler");
const Supplier = require("../models/supplierModel");

// @GET SUPPLIERS
exports.getSuppliers = asyncHandler(async (req, res) => {
  const result = await Supplier.find().select({ __v: 0 });
  res.status(200).json({ result });
});

// @GET SINGLE SUPPLIER BY ID
exports.getSingleSupplier = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const result = await Supplier.findById(id).select({ __v: 0 });

  res.status(200).json({ result: result || {} });
});

// @CREATE SUPPLIER
exports.createSupplier = asyncHandler(async (req, res) => {
  const { name, email, phone, address, description } = req.body;

  const newSupplier = new Supplier({
    name,
    email,
    phone,
    address,
    description,
  });

  // SAVE TO DATABASE
  const result = await newSupplier.save();

  // SEND RESPONSE
  res.status(201).json({ result, message: "Supplier added successfully" });
});

// @UPDATE SUPPLIER
exports.updateSupplier = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, address, description } = req.body;

  const result = await Supplier.findByIdAndUpdate(
    id,
    { name, email, phone, address, description },
    { new: true }
  ).select({ __v: 0 });

  res.status(200).json({ result, message: "Supplier updated successfully" });
});

// @DELETE SUPPLIER
exports.deleteSupplier = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await Supplier.findByIdAndDelete(id).select({ __v: 0 });
  res.status(200).json({ result, message: "Supplier deleted successfully" });
});
