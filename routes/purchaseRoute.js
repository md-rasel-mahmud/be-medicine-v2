const router = require("express").Router();
const {
  getAllPurchase,
  getSinglePurchase,
  createPurchase,
  updatePurchase,
  deletePurchase,
} = require("../controllers/purchaseController");

router.post("/add", createPurchase);
router.get("/", getAllPurchase);
router.get("/:id", getSinglePurchase);
router.put("/:id", updatePurchase);
router.delete("/:id", deletePurchase);

module.exports = router;
