const router = require("express").Router();
const {
  getSuppliers,
  getSingleSupplier,
  createSupplier,
  updateSupplier,
  deleteSupplier,
} = require("../controllers/supplierController");
const {
  userAuthenticate,
  adminAuthenticate,
} = require("../middlewares/authenticate");

// =================== ROUTES ===================
router.get("/supplier/all", userAuthenticate, getSuppliers);
router.post("/supplier", adminAuthenticate, createSupplier);
router.get("/supplier/:id", userAuthenticate, getSingleSupplier);
router.put("/supplier/:id", adminAuthenticate, updateSupplier);
router.delete("/supplier/:id", adminAuthenticate, deleteSupplier);

module.exports = router;
