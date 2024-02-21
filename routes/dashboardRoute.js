const router = require("express").Router();
const { getDashboard } = require("../controllers/dashboardController");
const { adminAuthenticate } = require("../middlewares/authenticate");

// ======================== DASHBOARD ROUTE ========================
router.get("/dashboard", adminAuthenticate, getDashboard);

module.exports = router;
