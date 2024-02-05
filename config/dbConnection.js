const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // DD connection
    const connectToDB = await mongoose.connect(
      `${process.env.MONGODB_URI}/medicineV2`,
      {
        w: "majority",
      }
    );
    console.log(
      "MongoDB Connected: ",
      "Host -",
      connectToDB.connection.host,
      ", DB Name -",
      connectToDB.connection.name
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
