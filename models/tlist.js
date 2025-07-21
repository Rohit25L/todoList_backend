const mong = require("mongoose");

const tolistSchema = new mong.Schema({
  title: { type: String, required: true },
  description: {
    type: String,
  },
  date: {
    type: Date,
    default: () => new Date(),
  },
  priority: {
    type: Number,
    default: 4,
  },
  user: [
    {
      type: mong.Types.ObjectId,
      ref: "user",
    },
  ],
});
module.exports = mong.model("list", tolistSchema);
