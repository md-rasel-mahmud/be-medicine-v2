const router = require("express").Router();
const {
  getSuppliers,
  getSingleSupplier,
  createSupplier,
  updateSupplier,
  deleteSupplier,
} = require("../controllers/supplierController");

router.route("/supplier").get(getSuppliers).post(createSupplier);
router
  .route("supplier/:id")
  .get(getSingleSupplier)
  .put(updateSupplier)
  .delete(deleteSupplier);

module.exports = router;
