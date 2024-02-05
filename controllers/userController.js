const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// @LOGIN USER
exports.loginUser = asyncHandler(async (req, res) => {
  // -> GET DATA FROM REQUEST BODY
  const { emailOrPhone, password } = req.body;

  // -> FIND USER BY EMAIL OR PHONE
  const findUser = await User.aggregate([
    {
      $match: {
        $or: [{ email: emailOrPhone }, { phone: emailOrPhone }],
      },
    },
  ]);

  // -> CHECK USER EXIST OR NOT
  if (!findUser.length) {
    res.status(400);
    throw new Error("User not found!");
  }

  // -> COMPARE PASSWORD
  const isMatchPassword = await bcrypt.compare(
    password,
    findUser?.[0].password
  );

  if (!isMatchPassword) {
    res.status(400);
    throw new Error("Invalid Password!");
  }

  // -> GET USER WITHOUT PASSWORD
  const { password: _password, ...result } = findUser[0];

  // -> SIGN JWT TOKEN
  const token = jwt.sign(
    { _id: result._id, role: result.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  res.status(200).json({ message: "Login Successfully", result, token });
});

// @REGISTER USER
exports.registerUser = asyncHandler(async (req, res) => {
  // -> HASH PASSWORD
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  // -> CREATE NEW USER
  const user = new User({
    ...req.body,
    password: hashedPassword,
  });

  // -> SAVE USER TO DATABASE
  const result = await user.save();

  // -> SIGN JWT TOKEN
  const token = jwt.sign(
    { _id: result._id, role: result.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  // -> SEND RESPONSE
  res.status(200).json({ message: "Register Successfully", result, token });
});

// @GET ALL USER
exports.getUsers = asyncHandler(async (req, res) => {
  // -> FIND ALL USER
  const result = await User.find().select({ password: 0 });
  // -> SEND RESPONSE
  res.status(200).json({ result });
});

// @GET SINGLE USER BY ID
exports.getSingleUser = asyncHandler(async (req, res) => {
  // -> FIND USER BY ID
  const result = await User.findById(req.params.id).select({ password: 0 });

  // -> CHECK USER EXIST OR NOT
  if (!result) {
    res.status(404);
    throw new Error("User not found!");
  }

  // -> SEND RESPONSE
  res.status(200).json({ result });
});

// @UPDATE USER BY ID
exports.updateUser = asyncHandler(async (req, res) => {
  const { name, email, phone, address, password, updatePassword } = req.body;

  // -> FIND USER BY ID
  const user = await User.findById(req.params.id);

  // -> CHECK USER EXIST OR NOT
  if (!user) {
    res.status(404);
    throw new Error("User not found!");
  }

  // ===================== CHANGE PASSWORD =====================
  if (password) {
    // -> MATCH PASSWORD
    const isMatchPassword = await bcrypt.compare(password, user.password);

    // -> CHECK PASSWORD MATCH OR NOT
    if (!isMatchPassword) {
      res.status(400);
      throw new Error("Current password not match!");
    }

    // -> HASH PASSWORD
    const updatedHashedPassword = await bcrypt.hash(updatePassword, 10);

    // -> UPDATE USER
    const result = await User.findByIdAndUpdate(req.params.id, {
      password: updatedHashedPassword,
    });

    // -> SEND RESPONSE
    return res
      .status(200)
      .json({ message: "User Password updated successfully", result });
  }

  // ================= UPDATE USER DETAILS =================
  const result = await User.findByIdAndUpdate(
    req.params.id,
    {
      name,
      email,
      phone,
      address,
    },
    { new: true }
  ).select({ password: 0 });

  // -> SEND RESPONSE
  res.status(200).json({ message: "User updated successfully", result });
});

// @UPDATE USER ROLE
exports.updateUserRole = asyncHandler(async (req, res) => {
  const { role } = req.body;

  // -> FIND USER BY ID
  const user = await User.findById(req.params.id);

  // -> CHECK USER EXIST OR NOT
  if (!user) {
    res.status(404);
    throw new Error("User not found!");
  }

  // -> UPDATE USER
  const result = await User.findByIdAndUpdate(
    req.params.id,
    {
      role,
    },
    { new: true }
  ).select({ password: 0 });

  // -> SEND RESPONSE
  res.status(200).json({ message: "User role updated successfully", result });
});
