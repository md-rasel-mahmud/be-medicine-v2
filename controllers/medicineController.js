const Medicine = require("../models/medicineModel");
const asyncHandler = require("express-async-handler");

// @GET ALL MEDICINE
exports.getMedicine = asyncHandler(async (req, res) => {
  const result = await Medicine.find().select({ __v: 0 });
  res.status(200).json({ result });
});

// @GET SINGLE MEDICINE BY ID
exports.getSingleMedicine = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const result = await Medicine.findById(id).select({ __v: 0 });

  res.status(200).json({ result: result || [] });
});

// @CREATE MEDICINE
exports.createMedicine = asyncHandler(async (req, res) => {
  const result = await Medicine.create(req.body).select({ __v: 0 });
  res.status(201).json({ message: "Medicine Create Successfully", result });
});

// @UPDATE MEDICINE BY ID
exports.updateMedicine = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // find data and if data not found then trow error
  const findMedicine = await Medicine.findById(id);
  if (!findMedicine) {
    res.send(404);
    throw new Error("Medicine Not found for Update!");
  }

  // update data and send response
  const result = await Medicine.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
  }).select({ __v: 0 });
  res.status(200).json({ message: "Medicine update Successfully", result });
});

// @DELETE MEDICINE BY ID
exports.deleteMedicine = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // find data and if data not found then throw error
  const findMedicine = await Medicine.findById(id);

  if (!findMedicine) {
    res.status(404);
    throw new Error("Medicine not found for Delete!");
  }

  // delete data and send response
  const result = await Medicine.deleteOne({ _id: id }).select({ __v: 0 });
  res.status(200).json({ message: "Medicine Delete Successfully", result });
});
