const router = require("express").Router();
const { userAuthenticate } = require("../middlewares/authenticate");

const {
  getAllUnit,
  createUnit,
  deleteUnit,
} = require("../controllers/unitController");

router.get("/unit/all", userAuthenticate, getAllUnit);
router.post("/unit", userAuthenticate, createUnit);
router.delete("/unit/:id", userAuthenticate, deleteUnit);

module.exports = router;
