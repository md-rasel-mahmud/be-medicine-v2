const router = require("express").Router();
const { adminAuthenticate } = require("../middlewares/authenticate");
const {
  getMedicine,
  updateMedicine,
  deleteMedicine,
  getSingleMedicine,
  createMedicine,
} = require("../controllers/medicineController");

router.get("/medicine", adminAuthenticate, getMedicine);
router.post("/medicine", adminAuthenticate, createMedicine);
router.get("/medicine/:id", adminAuthenticate, getSingleMedicine);
router.put("/medicine/:id", adminAuthenticate, updateMedicine);
router.delete("/medicine/:id", adminAuthenticate, deleteMedicine);

module.exports = router;
