const express = require("express");
const app = express();
const db = require("./connectionDB/condb");
require("dotenv").config();
const auth = require("./routes/auth");
const bodyParser = require("body-parser");
const rouList = require("./routes/List");
const cors = require("cors");
const path = require("path");
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  app.use(express.static(path.resolve(__dirname, "frontenda", "dist")));
  res.sendFile(path.resolve(__dirname, "frontenda", "dist", "index.html"));
});

app.use("/api/v1", auth);
app.use("/api/v2", rouList);


app.listen(process.env.PORT);
