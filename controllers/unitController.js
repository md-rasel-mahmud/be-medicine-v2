const asyncHandler = require("express-async-handler");
const Unit = require("../models/unitModel");

// @GET ALL UNIT
exports.getAllUnit = asyncHandler(async (req, res) => {
  // -> GET ALL UNIT
  const result = await Unit.find().select({ __v: 0 });

  res.status(200).json({ result });
});

// @CREATE UNIT
exports.createUnit = asyncHandler(async (req, res) => {
  // -> CREATE UNIT
  const result = await Unit.create(req.body).select({ __v: 0 });

  res.status(201).json({ message: "Unit Created Successfully", result });
});

// @UPDATE UNIT
exports.updateUnit = asyncHandler(async (req, res) => {
  // -> GET UNIT ID FROM REQUEST PARAMS
  const { id } = req.params;

  // -> FIND UNIT BY ID AND UPDATE
  const result = await Unit.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  }).select({ __v: 0 });

  res.status(200).json({ message: "Unit Updated Successfully", result });
});

// @DELETE UNIT
exports.deleteUnit = asyncHandler(async (req, res) => {
  // -> GET UNIT ID FROM REQUEST PARAMS
  const { id } = req.params;

  // -> FIND UNIT BY ID AND DELETE
  const result = await Unit.findByIdAndDelete(id).select({ __v: 0 });

  res.status(200).json({ message: "Unit Deleted Successfully", result });
});
