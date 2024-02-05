const router = require("express").Router();
const {
  getAllPurchase,
  getSinglePurchase,
  createPurchase,
  updatePurchase,
  deletePurchase,
} = require("../controllers/purchaseController");
const { adminAuthenticate } = require("../middlewares/authenticate");

// =================== ROUTES ===================
router.get("/purchase/all", adminAuthenticate, getAllPurchase);
router.post("/purchase", adminAuthenticate, createPurchase);
router.get("/purchase/:id", adminAuthenticate, getSinglePurchase);
router.put("/purchase/:id", adminAuthenticate, updatePurchase);
router.delete("/purchase/:id", adminAuthenticate, deletePurchase);

module.exports = router;
