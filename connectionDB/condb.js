const mong = require("mongoose");
require("dotenv").config()

const mongoURL = process.env.MONGODBURL;

mong.connect(mongoURL);

const db = mong.connection;

db.on("connected", () => {
  console.log("server Connected");
});

db.on("error", (err) => {
  console.log("server error" + err);
});

db.on("disconnected", () => {
  console.log("server disconnected");
});

module.exports = db;
