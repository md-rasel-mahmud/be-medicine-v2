const router = require("express").Router();
const {
  adminAuthenticate,
  userAuthenticate,
} = require("../middlewares/authenticate");
const {
  loginUser,
  registerUser,
  getUsers,
  getSingleUser,
  updateUser,
  updateUserRole,
  approveUser,
} = require("../controllers/userController");

// =================== ROUTES ===================
router.post("/login", loginUser);
router.post("/register", registerUser);

router.get("/user/all", adminAuthenticate, getUsers);
router.get("/user/:id", userAuthenticate, getSingleUser);
router.put("/user/:id", userAuthenticate, updateUser);

// Approve user (admin only)
router.patch("/user/approve/:id", adminAuthenticate, approveUser);
router.patch("/user/role/:id", adminAuthenticate, updateUserRole);

module.exports = router;
