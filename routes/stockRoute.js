const router = require("express").Router();
const {
  userAuthenticate,
  adminAuthenticate,
} = require("../middlewares/authenticate");
const {
  getStocks,
  updateStock,
  deleteStock,
  createStock,
  getSingleStock,
} = require("../controllers/stockController");

// =================== ROUTES ===================
router.get("/stock/all", userAuthenticate, getStocks);
router.get("/stock/:id", userAuthenticate, getSingleStock);
router.post("/stock", adminAuthenticate, createStock);
router.put("/stock/:id", adminAuthenticate, updateStock);
router.delete("/stock/:id", adminAuthenticate, deleteStock);

module.exports = router;
