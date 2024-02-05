const jwt = require("jsonwebtoken");

// ======================== USER AUTHENTICATE ========================
exports.userAuthenticate = (req, res, next) => {
  if (!req.headers["authorization"]) {
    res.status(401);
    throw new Error("Access denied");
  }

  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(403);
      throw new Error(`Invalid credential`);
    }
    req.user = decoded;
    next();
  });
};

// ======================== USER AUTHENTICATE ========================
exports.adminAuthenticate = (req, res, next) => {
  if (!req.headers["authorization"]) {
    res.status(401);
    throw new Error("Access denied");
  }

  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(403);
      throw new Error(`Invalid credential`);
    }
    if (decoded.role !== "ADMIN") {
      res.status(403);
      throw new Error("Access denied. You are not an admin");
    }
    req.user = decoded;
    next();
  });
};
