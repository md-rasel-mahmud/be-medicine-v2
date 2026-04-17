const router = require("express").Router();
const {
  userAuthenticate,
  adminAuthenticate,
} = require("../middlewares/authenticate");

const {
  getAllUnit,
  createUnit,
  deleteUnit,
  updateUnit,
} = require("../controllers/unitController");

// =================== ROUTES ===================
router.get("/unit/all", userAuthenticate, getAllUnit);
router.post("/unit", adminAuthenticate, createUnit);
router.put("/unit/:id", adminAuthenticate, updateUnit);
router.delete("/unit/:id", adminAuthenticate, deleteUnit);

module.exports = router;
