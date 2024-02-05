const router = require("express").Router();
const { userAuthenticate } = require("../middlewares/authenticate");
const {
  getSales,
  updateSale,
  deleteSale,
  getSingleSale,
  createSale,
} = require("../controllers/saleController");

router.get("/sales", userAuthenticate, getSales);
router.post("/sales", userAuthenticate, createSale);
router.get("/sales/:id", userAuthenticate, getSingleSale);
router.put("/sales/:id", userAuthenticate, updateSale);
router.delete("/sales/:id", userAuthenticate, deleteSale);

module.exports = router;
