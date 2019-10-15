const express = require("express");
const multer = require("multer");
const userRouter = require("./routes/users");
const adsRouter = require("./routes/ads");
const profileRouter = require("./routes/profile");
const mongoConnect = require("./db/database");
const path = require("path");

const app = express();

app.use(express.json({ extended: false }));

app.use(userRouter);
app.use(adsRouter);
app.use(profileRouter);
mongoConnect();

//serve static assets in production
if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("UP and running on port " + 5001);
});
