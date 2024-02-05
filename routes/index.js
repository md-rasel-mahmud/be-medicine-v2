// IMPORT ERROR HANDLER
const requestErrorHandler = require("../middlewares/requestErrorHandler");

// IMPORT ROUTES
const medicine = require("./medicineRoute");
const user = require("./userRoute");
const unit = require("./unitRoute");
const stock = require("./stockRoute");
const purchase = require("./purchaseRoute");
const supplier = require("./supplierRoute");

// ====================== ROUTES ======================
const routes = [medicine, user, unit, stock, purchase, supplier];

// ====================== INITIAL ROUTES ======================
const initialRoutes = (app) => {
  //   INITIAL ROUTES
  routes.forEach((route) => {
    app.use("/api/v2/", route);
  });

  // 404 ERROR HANDLER
  app.use("*", (req, res) => {
    res.status(404).json({
      error: "Not Found",
      message: `Endpoint not found at path '${req.originalUrl}' `,
    });
  });

  // ERROR HANDLER MIDDLEWARE
  app.use(requestErrorHandler);

  // RUN SERVER ON PORT
  const PORT = process.env.PORT || 5050;
  app.listen(PORT, () => console.log(`Server on running port: ${PORT}`));
};

module.exports = initialRoutes;
