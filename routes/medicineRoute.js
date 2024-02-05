const router = require("express").Router();
const {
  userAuthenticate,
  adminAuthenticate,
} = require("../middlewares/authenticate");
const {
  getMedicines,
  updateMedicine,
  deleteMedicine,
  getSingleMedicine,
  createMedicine,
} = require("../controllers/medicineController");

// =================== ROUTES ===================
router.get("/medicine/all", userAuthenticate, getMedicines);
router.post("/medicine", adminAuthenticate, createMedicine);
router.get("/medicine/:id", userAuthenticate, getSingleMedicine);
router.put("/medicine/:id", adminAuthenticate, updateMedicine);
router.delete("/medicine/:id", adminAuthenticate, deleteMedicine);

module.exports = router;
