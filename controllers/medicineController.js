const Medicine = require("../models/medicineModel");
const asyncHandler = require("express-async-handler");

// @GET ALL MEDICINE
exports.getMedicines = asyncHandler(async (req, res) => {
  const { page, limit } = req.query;
  const intPage = parseInt(page);
  const intLimit = parseInt(limit);

  let result, currentPage, totalPages, totalData, limitValue;
  if (!page || !limit) {
    result = await Medicine.find().select({ __v: 0 });
    currentPage = 1;
    totalData = result.length;
    limitValue = totalData;
    totalPages = 1;
  } else {
    result = await Medicine.find()
      .select({ __v: 0 })
      .limit(intLimit * 1)
      .skip((intPage - 1) * intLimit);
    currentPage = intPage;
    totalData = await Medicine.countDocuments();
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

// @GET MEDICINES BY IDS from  params
exports.getMedicinesByIds = asyncHandler(async (req, res) => {
  const { ids } = req.query;

  if (!ids) {
    res.status(400);
    throw new Error("IDs query parameter is required.");
  }

  const idsArray = ids.split(",").map((id) => id.trim());

  const result = await Medicine.find({ _id: { $in: idsArray } }).select({
    __v: 0,
  });

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
  const result = await Medicine.create(req.body);
  res.status(201).json({ message: "Medicine Create Successfully", result });
});

// @UPDATE MEDICINE BY ID
exports.updateMedicine = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // find data and if data not found then trow error
  const findMedicine = await Medicine.findById(id);
  if (!findMedicine) {
    res.status(404);
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

// @IMPORT MEDICINE
exports.importMedicines = asyncHandler(async (req, res) => {
  const { medicines } = req.body;

  if (!medicines || !Array.isArray(medicines) || medicines.length === 0) {
    res.status(400);
    throw new Error("Medicines array is required to process imports.");
  }

  const result = await Medicine.insertMany(medicines);
  res.status(201).json({
    message: `${result.length} Medicines imported successfully`,
    result,
  });
});
