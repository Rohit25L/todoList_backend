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


const completead = require("./routes/completedRou");

app.use("/api/v3", completead);
app.use("/api/v1", auth);
app.use("/api/v2", rouList);


app.listen(process.env.PORT);
