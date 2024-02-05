const router = require("express").Router();
const { userAuthenticate } = require("../middlewares/authenticate");
const {
  getStocks,
  updateStock,
  deleteStock,
  createStock,
} = require("../controllers/stockController");

router.get("/stock/all", userAuthenticate, getStocks);
router.post("/stock", userAuthenticate, createStock);
router.put("/stock/:id", userAuthenticate, updateStock);
router.delete("/stock/:id", userAuthenticate, deleteStock);

module.exports = router;
