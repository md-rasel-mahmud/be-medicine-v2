const asyncHandler = require("express-async-handler");

const Sale = require("../models/Sale");

// @GET ALL SALES

module.exports.getSales = asyncHandler(async (req, res) => {
  const sales = await Sale.find({});
  res.json(sales);
});

// @GET SINGLE SALE
module.exports.getSingleSale = asyncHandler(async (req, res) => {
  const sale = await Sale.findById(req.params.id);
  if (sale) {
    res.json(sale);
  } else {
    res.status(404);
    throw new Error("Sale not found");
  }
});

// @CREATE SALE
module.exports.createSale = asyncHandler(async (req, res) => {
  const { name, price, quantity, total, payment, balance } = req.body;

  const sale = new Sale({
    name,
    price,
    quantity,
    total,
    payment,
    balance,
  });

  const createdSale = await sale.save();
  res.status(201).json(createdSale);
});

// @UPDATE SALE
module.exports.updateSale = asyncHandler(async (req, res) => {
  const { name, price, quantity, total, payment, balance } = req.body;

  const sale = await Sale.findById(req.params.id);

  if (sale) {
    sale.name = name;
    sale.price = price;
    sale.quantity = quantity;
    sale.total = total;
    sale.payment = payment;
    sale.balance = balance;

    const updatedSale = await sale.save();
    res.json(updatedSale);
  } else {
    res.status(404);
    throw new Error("Sale not found");
  }
});

// @DELETE SALE
module.exports.deleteSale = asyncHandler(async (req, res) => {
  const sale = await Sale.findById(req.params.id);
  if (sale) {
    await sale.remove();
    res.json({ message: "Sale removed" });
  } else {
    res.status(404);
    throw new Error("Sale not found");
  }
});
