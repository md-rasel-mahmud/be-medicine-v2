// IMPORT PACKAGES
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

// INTERNAL IMPORT
const connectDB = require("./config/dbConnection");
const initialRoutes = require("./routes");

// GET APP FROM EXPRESS
const app = express();

// ==================== MIDDLEWARES ====================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// ==================== DATABASE CONNECTION ====================
connectDB();

// ==================== ROUTES ====================
initialRoutes(app);
