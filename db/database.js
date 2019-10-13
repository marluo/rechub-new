require("dotenv").config();
const mongoose = require("mongoose");

const mongodbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true
    });
  } catch (err) {
    console.log(err.message);

    process.exit(1);
  }
  console.log("DB CONNECTED");
};

module.exports = mongodbConnect;
