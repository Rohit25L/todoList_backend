const mong = require("mongoose");

const completedSchema = new mong.Schema({
  title: { type: String, required: true },
    user: [
      {
        type: mong.Types.ObjectId,
        ref: "user",
      },
    ],
  });
  module.exports = mong.model("Comp", completedSchema);