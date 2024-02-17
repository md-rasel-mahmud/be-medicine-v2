const router = require("express").Router();
const { userAuthenticate } = require("../middlewares/authenticate");
const {
  getSales,
  createSale,
  getSingleSale,
  updateSale,
  deleteSale,
} = require("../controllers/saleController");

// =================== ROUTES ===================
router.get("/sale/all", userAuthenticate, getSales);
router.post("/sale", userAuthenticate, createSale);
router.get("/sale/:id", userAuthenticate, getSingleSale);
router.put("/sale/:id", userAuthenticate, updateSale);
router.delete("/sale/:id", userAuthenticate, deleteSale);

module.exports = router;
