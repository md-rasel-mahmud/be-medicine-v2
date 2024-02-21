// const Dashboard = require("../models/dashboardModel");
const Medicine = require("../models/medicineModel");
const Stock = require("../models/stockModel");
const Sale = require("../models/saleModel");
const Purchase = require("../models/purchaseModel");
const Supplier = require("../models/supplierModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

// @GET DASHBOARD DATA
exports.getDashboard = asyncHandler(async (req, res) => {
  const { report = "daily" } = req.query;

  const totalMedicines = await Medicine.countDocuments();
  const totalSaleToCustomer = await Sale.countDocuments();
  const totalPurchaseFromSupplier = await Purchase.countDocuments();
  const totalSupplier = await Supplier.countDocuments();
  const totalUser = await User.countDocuments();
  // total stock quantity
  const [totalStock] = await Stock.aggregate([
    {
      $unwind: "$medicines",
    },
    {
      $group: {
        _id: null,
        total: { $sum: "$medicines.quantity" },
      },
    },
    {
      $project: {
        _id: 0,
        total: 1,
      },
    },
  ]);

  if (report === "daily") {
    const [stockAmount] = await Stock.aggregate([
      {
        $unwind: "$medicines",
      },
      {
        $lookup: {
          from: "medicines",
          localField: "medicines.medicine",
          foreignField: "_id",
          as: "mainMedicines",
        },
      },
      {
        $unwind: "$mainMedicines",
      },
      {
        $group: {
          _id: {
            $month: "$createdAt",
          },
          total: {
            $sum: {
              $multiply: [
                "$medicines.quantity",
                "$mainMedicines.price.unitPrice",
              ],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          total: 1,
        },
      },
    ]);

    const [sale] = await Sale.aggregate([
      {
        $group: {
          _id: {
            $month: "$createdAt",
          },
          total: { $sum: "$totalAmount" },
        },
      },
      {
        $project: {
          total: 1,
          _id: 0,
        },
      },
    ]);

    const [purchase] = await Purchase.aggregate([
      {
        $group: {
          _id: {
            $month: "$createdAt",
          },
          total: { $sum: "$totalAmount" },
        },
      },
      {
        $project: {
          total: 1,
          _id: 0,
        },
      },
    ]);

    return res.status(200).json({
      result: {
        totalMedicines,
        totalSaleToCustomer,
        totalPurchaseFromSupplier,
        totalSupplier,
        totalUser,
        totalStock,
        report: {
          filter: "monthly",
          sale,
          purchase,
          stockAmount,
        },
      },
    });
  }

  if (report === "month") {
    const [stockAmount] = await Stock.aggregate([
      {
        $unwind: "$medicines",
      },
      {
        $lookup: {
          from: "medicines",
          localField: "medicines.medicine",
          foreignField: "_id",
          as: "mainMedicines",
        },
      },
      {
        $unwind: "$mainMedicines",
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          total: {
            $sum: {
              $multiply: [
                "$medicines.quantity",
                "$mainMedicines.price.unitPrice",
              ],
            },
          },
        },
      },
      {
        $project: {
          date: "$_id",
          total: 1,
          _id: 0,
        },
      },
    ]);

    const [sale] = await Sale.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          total: { $sum: "$totalAmount" },
        },
      },
      {
        $project: {
          date: "$_id",
          total: 1,
          _id: 0,
        },
      },
    ]);

    const [purchase] = await Purchase.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          total: { $sum: "$totalAmount" },
        },
      },
      {
        $project: {
          date: "$_id",
          total: 1,
          _id: 0,
        },
      },
    ]);

    return res.status(200).json({
      result: {
        totalMedicines,
        totalSaleToCustomer,
        totalPurchaseFromSupplier,
        totalSupplier,
        totalUser,
        totalStock,
        report: {
          filter: "daily",
          sale,
          purchase,
          stockAmount,
        },
      },
    });
  }

  if (report === "all") {
    const [stockAmount] = await Stock.aggregate([
      {
        $unwind: "$medicines",
      },
      {
        $lookup: {
          from: "medicines",
          localField: "medicines.medicine",
          foreignField: "_id",
          as: "mainMedicines",
        },
      },
      {
        $unwind: "$mainMedicines",
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: {
              $multiply: [
                "$medicines.quantity",
                "$mainMedicines.price.unitPrice",
              ],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          total: 1,
        },
      },
    ]);

    const [sale] = await Sale.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$totalAmount" },
        },
      },
      {
        $project: {
          total: 1,
          _id: 0,
        },
      },
    ]);

    const [purchase] = await Purchase.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$totalAmount" },
        },
      },
      {
        $project: {
          total: 1,
          _id: 0,
        },
      },
    ]);

    return res.status(200).json({
      result: {
        totalMedicines,
        totalSaleToCustomer,
        totalPurchaseFromSupplier,
        totalSupplier,
        totalUser,
        totalStock,
        report: {
          filter: "all",
          sale,
          purchase,
          stockAmount,
        },
      },
    });
  }

  res.status(400);
  throw new Error("Invalid Report Type");
});
